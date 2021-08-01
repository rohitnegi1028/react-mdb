import { useState, useEffect, useCallback } from 'react';
//API
import API from '../API'

const initialState = {
    page : 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useMovieFetch = (movieId) => {

    const [state, setState] = useState(initialState); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 

    const fetchMovie = useCallback(async (movieId) => {
        try {
            setError(false);
            setLoading(true);

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            // get directors only
            const directors = credits.crew.filter(member => member.job === 'Director')

            //Setting movies in state variable for keeping previous values
            setState(prev => ({
                ...movie,
                actors: credits.cast,
                directors
            }));

        }
        catch (error) {
            console.log(error)
            setError(true);
        }
        setLoading(false);
    },[movieId]);
    //Initial Render & search
    useEffect(() => {
        fetchMovie(movieId);
    }, [movieId,fetchMovie])


    console.log(error)

    return {state, loading, error};

}
