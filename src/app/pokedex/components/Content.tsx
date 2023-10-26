import { PokedexListItem } from "./PokedexListItem";
import { usePokedexQuery } from "../hooks/usePokedexQuery";
import { PokemonInfo } from "./PokemonInfo";
import { Pokemon } from "../types";
import { useState } from "react";
import { Modal } from "@/components/Molecules/Modal";
import { Card } from "@/components/Molecules/Card";

const Content = () => {
  const { data, error, loading } = usePokedexQuery();

  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>();

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>An error has occurred</h1>;

  const pokemonInfoCardClassName = `relative flex h-3/4 min-h-[700px] w-full flex-col items-center transition-all ${
    currentPokemon ? "bg-blue-300" : "bg-blue-300/50"
  }`;

  return (
    <div className="flex h-full items-center lg:w-3/4">
      <div className="no-scrollbar h-full w-1/4 grow overflow-x-hidden overflow-y-scroll px-4 py-28">
        {data.map((pokemon: Pokemon, index: number) => (
          <PokedexListItem
            key={pokemon.name}
            pokemon={pokemon}
            className={`${index === 0 ? "" : "mt-3"} cursor-pointer`}
            onClick={() => setCurrentPokemon(pokemon)}
          />
        ))}
      </div>
      <div className="hidden h-full w-3/5 min-w-[500px] flex-col items-center justify-center py-14 pr-4 md:flex">
        <Card className={pokemonInfoCardClassName}>
          <PokemonInfo pokemon={currentPokemon} />
        </Card>
      </div>
      {currentPokemon && (
        <Modal className="md:hidden" cardClassName={pokemonInfoCardClassName}>
          <PokemonInfo pokemon={currentPokemon} />
        </Modal>
      )}
    </div>
  );
};

export default Content;
