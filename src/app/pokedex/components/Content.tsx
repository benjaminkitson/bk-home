"use client";

import { Card } from "@/components/Molecules/Card";
import { Modal } from "@/components/Molecules/Modal";
import { useState } from "react";
import { Pokemon } from "../types";
import { PokedexListItem } from "./PokedexListItem";
import { PokemonInfo } from "./PokemonInfo";

interface ContentProps {
  pokemon: Pokemon[];
}

const Content: React.FC<ContentProps> = ({ pokemon }) => {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  const pokemonInfoCardClassName = `relative flex h-3/4 min-h-[500px] w-full flex-col items-center transition-all ${
    currentPokemon ? "bg-blue-300" : "bg-blue-300/50"
  }`;

  return (
    <div className="flex w-full flex-1 shrink overflow-y-hidden pt-20 lg:w-3/4">
      <div className="no-scrollbar w-full grow overflow-x-hidden overflow-y-scroll px-4 py-12 md:w-1/4">
        {pokemon.map((pokemon: Pokemon, index: number) => (
          <PokedexListItem
            key={pokemon.name}
            pokemon={pokemon}
            className={`${index === 0 ? "" : "mt-3"} cursor-pointer`}
            onClick={() => setCurrentPokemon(pokemon)}
            prioritiseImage={index < 20}
          />
        ))}
      </div>
      <div className="hidden h-full w-3/5 min-w-[500px] flex-col items-center justify-center py-14 pr-4 md:flex">
        <Card className={pokemonInfoCardClassName}>
          <PokemonInfo pokemon={currentPokemon} />
        </Card>
      </div>
      <Modal
        cardClassName={pokemonInfoCardClassName}
        isOpen={!!currentPokemon}
        handleClose={() => setCurrentPokemon(undefined)}
        isMobileOnly
      >
        <PokemonInfo pokemon={currentPokemon} />
      </Modal>
    </div>
  );
};

export default Content;
