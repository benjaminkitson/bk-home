"use client";

import { PokedexListItem } from "./PokedexListItem";
import { PokemonInfo } from "./PokemonInfo";
import { Pokemon } from "../types";
import { useState } from "react";
import { Modal } from "@/components/Molecules/Modal";
import { Card } from "@/components/Molecules/Card";

interface ContentProps {
  pokemon: Pokemon[];
}

const Content: React.FC<ContentProps> = ({ pokemon }) => {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  const pokemonInfoCardClassName = `relative flex h-3/4 min-h-[500px] w-full flex-col items-center transition-all ${
    currentPokemon ? "bg-blue-300" : "bg-blue-300/50"
  }`;

  return (
    <div className="flex h-full w-full items-center lg:w-3/4">
      <div className="no-scrollbar h-full w-full grow overflow-x-hidden overflow-y-scroll px-4 py-4 md:w-1/4 lg:py-28">
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
