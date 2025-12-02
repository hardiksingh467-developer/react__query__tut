import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHeroes = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

const DynamicParallel = ({ heroIds}) => {
  const queryResults = useQueries(
    heroIds.map( id => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHeroes(id)
      }
    })

  );
  // The above will return an array of Query results
  console.log("Query results are ", { queryResults});
  
  return (
    <div>DynamicParallel</div>
  )
}

export default DynamicParallel