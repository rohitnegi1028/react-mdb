import { useState, useEffect, useRef } from 'react';
//API
import API from '../API'
import { isPersistedState } from '../helpers';
const initialState = {
    page : 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [state, setState] = useState(initialState); 
    const [loading, setLoading] = useState(false); // useStateReturns Array
    const [error, setError] = useState(false); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [isLoadingMoe, setIsLoadingMoe] = useState(false); 

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
    //Initial Render & search
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');
      
            if (sessionState) {
              console.log('Grabbing from sessionStorage');
              setState(sessionState);
              return;
            }
          }
          console.log('Grabbing from api');

        fetchMovies(1, searchTerm);
    }, [searchTerm])

    useEffect(() => {
        if(!isLoadingMoe) return;
        fetchMovies(state.page+1, searchTerm);
        setIsLoadingMoe(false);
    }, [isLoadingMoe])

    //to set session
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state));
      }, [searchTerm, state]);
    

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMoe};

}
