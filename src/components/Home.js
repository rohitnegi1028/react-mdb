import React, { useState, useEffect } from 'react';
//API
import API from '../API'
//Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
//Image 
import NoImage from '../images/no_image.jpg';
//Hooks
import { useHomeFetch  } from '../hooks/useHomeFetch';


const Home = () => {
    const {state, loading, error} = useHomeFetch();
  
    return (<div>Home Page</div>);

}

export default Home;