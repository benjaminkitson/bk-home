import { useQuery } from "@tanstack/react-query";
import { PokedexListItem } from "./PokedexListItem";

export type Pokemon = {
  name: string;
  ability: string;
  description: string;
  evolutionChain: string[];
  height: number;
  id: string;
  mainImageSrc: string;
  thumbImageSrc: string;
  types: string[];
  weight: number;
};

export const Content = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["pokedex"],
    queryFn: () =>
      fetch("https://pokedex.benjaminkitson.com/api").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred";

  console.log(data);

  return (
    <>
      <div className="h-full w-full overflow-scroll p-5">
        {data.map((pokemon: Pokemon) => (
          <PokedexListItem key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div className="flex h-full w-full grow flex-col items-center justify-start">
        Hello
      </div>
    </>
  );
};
