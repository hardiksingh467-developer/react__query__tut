import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};
export const useSuperHeroData = (heroId) => {
  // as the key is also dependent on the heroId as well , if we were to pass string value as key instead of an array and call the hook using heroId 1 then even for heroId 2, 3, and so on the cached value of heroId 1 will be used, that is, same data for different ID's hence we need to make it an array
  // To be more specific, If we fetch the data for ID 1 and return back, then back to the page again with ID 2 in the params, we would see the data of ID 1 for a small amount of time due to it being cached
  // By passing an array instead of a string React Query will now maintain a separate query for each hero
  return useQuery(["super-hero", heroId], () => fetchSuperHero(heroId));
};

export default useSuperHeroData;
