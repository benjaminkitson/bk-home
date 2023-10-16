"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

/**
 * A (currently quite hacky) wrapper around useQuery that stores the pokemon in localstorage if they don't exist
 */
export const usePokedexQuery = () => {
  const hasFetched = useRef(false);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["pokedex"],
    queryFn: () =>
      fetch("https://pokedex.benjaminkitson.com/api").then((res) => res.json()),
    enabled: false,
  });

  let storedPokemonJSON;

  if (!hasFetched.current) {
    hasFetched.current = true;
    storedPokemonJSON =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("pokemon")
        : null;
    if (!storedPokemonJSON) {
      refetch();
    }
  }

  useEffect(() => {
    if (data && typeof localStorage !== "undefined") {
      localStorage.setItem("pokemon", JSON.stringify(data));
    }
  }, [data]);

  const pokemonData = storedPokemonJSON ? JSON.parse(storedPokemonJSON) : data;

  const loading = pokemonData ? false : isLoading;

  return { data: pokemonData, error, isLoading: loading };
};
