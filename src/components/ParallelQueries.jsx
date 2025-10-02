// file imports
// dependency imports
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchSuperheroes = async () => {
    return await axios.get("http://localhost:4000/superheroes")
}

const fetchFriends = async () => {
    return await axios.get("http://localhost:4000/friends")
}

const ParallelQueries = () => {

    // use aliases , which are very similar to the keyword we encounter while importing libraries, that is, `as`
    const {data: superheores} = useQuery(['super-heroes'], fetchSuperheroes);
    const {data: friends} = useQuery(['friends'], fetchFriends);
  return (
    <div>ParallelQueries</div>
  )
}

export default ParallelQueries