import React, { useState, useEffect } from 'react';
//API
import API from '../API'
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Image 
import NoImage from '../images/no_image.jpg';
//Hooks
import { useHomeFetch  } from '../hooks/useHomeFetch';
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';

const Home = () => {
    const {state, loading, error, searchTerm, setSearchTerm} = useHomeFetch();
     
    //Fragment shorthanded
    return (<>
        {/* {state.results[0] && */}
        {!searchTerm && state.results[0] ?
        <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[1].backdrop_path}`}
            title={state.results[1].original_title}
            text={state.results[1].overview}
        />
        : null
        }
        <SearchBar setSearchTerm={setSearchTerm}/>
        <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
            {state.results.map(movie => (
               <Thumb
                key={movie.id}
                image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
                movieId={movie.id}
                />
            ))
            }
        </Grid>
        <Spinner/>

    </>);

}

export default Home;