import React, { useState, useEffect } from 'react';
//API
import API from '../API'
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Image 
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const [state, setState] = useState(); // useStateReturns Array
    const [loading, setLoading] = useState(false); // useStateReturns Array
    const [error, setError] = useState(false); // useStateReturns Array

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page);
            console.log(movies);

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

    return (<div>Home Page</div>);

}

export default Home;