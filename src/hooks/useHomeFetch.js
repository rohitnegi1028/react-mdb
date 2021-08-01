import { useState, useEffect, useRef } from 'react';
//API
import API from '../API'

const initialState = {
    page : 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [state, setState] = useState(initialState); // useStateReturns Array
    const [loading, setLoading] = useState(false); // useStateReturns Array
    const [error, setError] = useState(false); // useStateReturns Array

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);

            //Setting movies in state variable for keeping previous values
            setState(prev => ({
                ...movies,
                results :
                page > 1 ? [...prev.results,...movies.results] : [...movies.results]
            }));

        }
        catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    //Initial Render []
    useEffect(() => {
        fetchMovies(1);
    }, [])


    return {state, loading, error};

}
