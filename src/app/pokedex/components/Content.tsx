import { PokedexListItem } from "./PokedexListItem";
import { usePokedexQuery } from "../hooks/usePokedexQuery";

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

const Content = () => {
  const { data, error, loading } = usePokedexQuery();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>An error has occurred</h1>;

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

export default Content;
