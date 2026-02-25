import { H1, H2, P } from "@/components/Atoms/Typography";
import { Card } from "@/components/Molecules/Card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pokemon } from "../types";
import { TypeItem } from "./TypeItem";

interface PokemonInfoProps {
  pokemon?: Pokemon;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemon }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [pokemon]);

  if (!pokemon) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 p-6">
      <Card className="relative h-[280px] w-full shrink-0 overflow-hidden shadow-inner">
        <Image
          className={`object-contain transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          alt="Main pokemon image"
          src={pokemon.mainImageSrc}
          fill
          priority
          onLoad={() => {
            setIsLoading(false);
          }}
        />
      </Card>
      <div className="flex grow flex-col items-center justify-start border-t border-white/10 px-8 pt-5 text-center">
        <H1 className="mb-2">{pokemon.name}</H1>
        <H2 className="mb-3 text-xl text-white/80 md:text-2xl">
          Ability:{" "}
          <span className="font-semibold text-white">{pokemon.ability}</span>
        </H2>
        <P className="max-w-prose text-justify text-white/95">
          {pokemon.description}
        </P>
        <div className="mt-auto flex flex-wrap justify-center gap-2 pt-4">
          {pokemon.types.map((type) => (
            <TypeItem type={type} key={type} />
          ))}
        </div>
      </div>
    </div>
  );
};
