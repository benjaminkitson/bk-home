import { PokedexListItem } from "./PokedexListItem";
import { usePokedexQuery } from "../hooks/usePokedexQuery";
import { PokemonInfo } from "./PokemonInfo";
import { Pokemon } from "../types";
import { useState } from "react";

const Content = () => {
  const { data, error, loading } = usePokedexQuery();

  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>An error has occurred</h1>;

  return (
    <div className="flex h-full w-full px-52">
      <div className="h-full grow overflow-x-hidden overflow-y-scroll px-4 py-10">
        {data.map((pokemon: Pokemon) => (
          <PokedexListItem
            key={pokemon.name}
            pokemon={pokemon}
            className="my-3 cursor-pointer"
            onClick={() => setCurrentPokemon(pokemon)}
          />
        ))}
      </div>
      <div className="flex h-full w-2/3 flex-col items-center justify-center py-14">
        <PokemonInfo pokemon={currentPokemon} />
      </div>
    </div>
  );
};

export default Content;
