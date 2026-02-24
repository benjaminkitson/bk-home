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

  const pokemonInfoCardClassName = `relative flex h-3/4 min-h-[500px] w-full flex-col items-center overflow-hidden text-white transition-all shadow-xl ring-1 ring-white/20 ${
    currentPokemon
      ? "bg-gradient-to-br from-blue-600/80 via-blue-500/75 to-sky-600/75"
      : "bg-gradient-to-br from-blue-600/65 via-blue-500/62 to-sky-600/65 opacity-90"
  }`;

  return (
    <div className="flex w-full flex-1 shrink overflow-y-hidden lg:w-2/3">
      <div className="no-scrollbar h-full grow overflow-x-hidden overflow-y-scroll px-4 pb-12 pt-32 md:w-1/4">
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
