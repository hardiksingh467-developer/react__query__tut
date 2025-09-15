// file imports
// dependency imports
import { useQuery } from "@tanstack/react-query";// useQuery is what we are going to be using for all our Data Reading needs
import axios from "axios";

const RQSuperHeroesPage = () => {
  // useQuery requires at least two arguments,
  // The first argument is a unique key to identify this query
  // The second argument is a callback function that returns a promise
  const response = useQuery('super-heroes', () => {
    return axios.get("http://loalhost:4000/superheroes");
  });

  const { isLoading, data, isError, error } = response;

  if(isLoading){
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>RQSuperHeroesPage</div>
    </>
  )
}

export default RQSuperHeroesPage