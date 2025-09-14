import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
  }, [])

  if(isLoading){
    return <h2>Loading...</h2>
  }
  return (
    <div>
      <h2>SuperHeroesPage</h2>
      {data.map((hero) => {
        return <div key={hero?.name}>{hero?.name}</div>
      })}
    </div>
  )
}

export default SuperHeroesPage