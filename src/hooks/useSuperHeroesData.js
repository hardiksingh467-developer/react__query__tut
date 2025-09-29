//* What we know about customHooks is that the simple are a way to write utils in React, that is, they majorly export variables
//* 1. Copy and Paste the useQuery hook here
//* 2. Copy and Paste the fetcher function here
//*
//*
//*
// file imports
// dependency imports

import { useQuery } from "@tanstack/react-query";

const fetchSuperHeroes = () => {
    const URL = 'http://localhost:4000/superheroes';
    const response = axios.get(URL);
}
export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchSuperHeroes, {
        onSuccess,
        onError,
        select: (data) => {
            const superHeroesName = data.data.map((hero) = hero.name);
            return superHeroesName;
        }
    })
}
/*
*The above hook is simply a wrapper around the useQuery hook
we simply return the RHS side of our useQuery code 
Typically we would have custom onSuccess and onError callbacks, hence we pass them as params in the custom hook

If we replace this hook in our component, one thing we will see right out of the box os that we would have a cleaner component code
*/