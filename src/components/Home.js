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


const Home = () => {
    const {state, loading, error} = useHomeFetch();
    const getMovieIndex = (min, max) => { 
        return Math.random() * (max - min) + min;
    } 

     
    //Fragment shorthanded
    return (<>
        {/* {state.results[0] && */}
        {state.results[0] ?
        <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[1].backdrop_path}`}
            title={state.results[1].original_title}
            text={state.results[1].overview}
        />
        : null
        }
    </>);

}

export default Home;