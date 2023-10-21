"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

/**
 * A (currently quite hacky) wrapper around useQuery that stores the pokemon in localstorage if they don't exist
 */
export const usePokedexQuery = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["pokedex"],
    queryFn: () =>
      fetch("https://pokedex.benjaminkitson.com/api").then((res) => res.json()),
    enabled: false,
  });

  // TODO: Change this to actual Pokemon data type
  const [cacheData, setCacheData] = useState<string | null>(null);

  const didTryCache = useRef(false);

  if (!didTryCache.current) {
    didTryCache.current = true;
    const cachedData =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("pokemon")
        : null;

    if (cachedData) {
      setCacheData(JSON.parse(cachedData));
    } else {
      console.log("No cached data found, fetching from API...");
      refetch();
    }
  }

  if (data && !cacheData) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("pokemon", JSON.stringify(data));
    }
  }

  // const loading = isLoading;
  const loading = !cacheData && isLoading;

  return { data: data || cacheData, error, loading };
};
