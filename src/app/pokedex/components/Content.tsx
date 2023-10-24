import { PokedexListItem } from "./PokedexListItem";
import { usePokedexQuery } from "../hooks/usePokedexQuery";
import { PokemonInfo } from "./PokemonInfo";
import { Pokemon } from "../types";
import { useState } from "react";
import { Modak } from "next/font/google";
import { Modal } from "@/components/Molecules/Modal";

const Content = () => {
  const { data, error, loading } = usePokedexQuery();

  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>An error has occurred</h1>;

  return (
    <div className="flex h-full w-full items-center">
      <div className="h-full w-1/4 grow overflow-x-hidden overflow-y-scroll px-4 py-10 pt-24">
        {data.map((pokemon: Pokemon) => (
          <PokedexListItem
            key={pokemon.name}
            pokemon={pokemon}
            className="my-3 cursor-pointer"
            onClick={() => setCurrentPokemon(pokemon)}
          />
        ))}
      </div>
      <div className="hidden h-full flex-col items-center justify-center py-14 lg:flex">
        <PokemonInfo pokemon={currentPokemon} />
      </div>
      {currentPokemon && (
        <Modal className="flex md:hidden">
          <PokemonInfo pokemon={currentPokemon} />
        </Modal>
      )}
    </div>
  );
};

export default Content;
