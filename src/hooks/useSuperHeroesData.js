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