import React from 'react';
import { useParams } from 'react-router';



import { useMovieFetch } from '../hooks/useMovieFetch';
import BreadCrumb from './BreadCrumb';
import Spinner from './Spinner';

const Movie = () => {
    const {movieId} = useParams();
    const { state : movie, loading, error } = useMovieFetch(movieId);
    if(loading) return <Spinner/>;
    if(error) return <div>Something went wrong </div>;
    
    return <>
    <BreadCrumb movieTitle={movie.original_title}/>
    </>
}

export default Movie;