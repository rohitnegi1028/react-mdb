import React from 'react';
//Config
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../config';
//Hooks
import { useHomeFetch } from '../hooks/useHomeFetch';
//Image 
import NoImage from '../images/no_image.jpg';
import Button from './Button';
import Grid from './Grid';
import HeroImage from './HeroImage';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Thumb from './Thumb';

const Home = () => {
    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMoe} = useHomeFetch();
     
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
                clickable={true}
                />
            ))
            }
        </Grid>
        {loading && <Spinner/>}
        {state.page < state.total_pages && !loading && (<Button text='Load More'
        callback={()=>setIsLoadingMoe(true)}/>)}
    </>);

}

export default Home;