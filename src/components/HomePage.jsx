import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    const navigate = useNavigate()
    const handleClick = (e) => {
    console.log("clicked ", e.target.innerText)
    if(e.target.innerText === "Traditional SuperHeroes"){
        navigate("/superheroes");
    }else {
        navigate("/react-query");
    }
    }
  return (
    <div className='home__section'>
        <div onClick={handleClick} className="home__link home__link__1">Traditional SuperHeroes</div>
        <div onClick={handleClick} className="home__link home__link__2">React Query SuperHeroes</div>
    </div>
  )
}

export default HomePage