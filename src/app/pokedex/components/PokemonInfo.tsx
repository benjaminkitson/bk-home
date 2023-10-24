import { Card } from "@/components/Molecules/Card";
import { Pokemon } from "../types";
import Image from "next/image";
import { H1, P } from "@/components/Atoms/Typography";
import { useEffect, useState } from "react";
import { TbPokeball } from "react-icons/tb";
import { TypeItem } from "./TypeItem";
import { TypeFlags } from "typescript";

interface PokemonInfoProps {
  pokemon?: Pokemon;
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemon }) => {
  console.log(pokemon);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [pokemon]);

  if (!pokemon) {
    return null;
  }

  return (
    <Card className="relative flex h-[800px] w-[600px] flex-col items-center bg-blue-300/50">
      {/* {isLoading && <ImageLoader />} */}
      <div
        className={`flex h-full w-full flex-col items-center justify-center p-5`}
      >
        <Card className="relative h-[450px] w-full border border-gray-400/50 bg-blue-400/50">
          {/* <div
            className={`absolute z-20 flex h-full w-full items-center justify-center ${
              isLoading ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000`}
          >
            <TbPokeball className="animate-spin text-9xl" />
          </div> */}
          <Image
            className={`${
              // This isn't great, but is a start
              isLoading ? "opacity-0" : "opacity-100"
            } w-full transition-opacity duration-500`}
            alt="Main pokemon image"
            src={pokemon.mainImageSrc}
            fill={true}
            priority
            onLoad={() => setIsLoading(false)}
            objectFit="contain"
          />
        </Card>
        <div className="flex grow flex-col items-center justify-start p-5">
          <H1 className="mb-3">{pokemon.name}</H1>
          <P className="mb-2">Ability: {pokemon.ability}</P>
          <P className="grow text-justify">{pokemon.description}</P>
          <div className="my-5 flex">
            {pokemon.types.map((type) => (
              <TypeItem type={type} key={type} className="mx-2" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
