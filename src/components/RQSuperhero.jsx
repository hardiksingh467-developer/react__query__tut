import React from 'react'
import { useParams } from 'react-router-dom';
import useSuperHeroData from '../hooks/useSuperHeroData';

const RQSuperhero = () => {

    const {heroId} = useParams();

    const { isLoading, data, error, isError} = useSuperHeroData(heroId);

    if(isLoading){
        return <h2>Loading...</h2>
    }

    if(isError){
        return <h2>{error.message}</h2>
    }

    

  return (
    <div>RQSuperhero</div>
  )
}

export default RQSuperhero