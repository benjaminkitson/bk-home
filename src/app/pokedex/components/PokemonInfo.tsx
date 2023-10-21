import { Card } from "@/components/Molecules/Card";
import { Pokemon } from "../types";
import Image from "next/image";
import { H1 } from "@/components/Atoms/Typography";
import { useState } from "react";

interface PokemonInfoProps {
  pokemon?: Pokemon;
}

const ImageLoader = () => {
  return <div className="bg-green h-full w-full"></div>;
};

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemon }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!pokemon) {
    return null;
  }

  return (
    <Card className="flex h-[700px] w-[600px] flex-col items-center bg-blue-300/50">
      <div className="relative h-2/3 w-2/3">
        <Image
          className={`w-full ${isLoaded ? "" : "hidden"}`}
          alt="Main pokemon image"
          src={pokemon.mainImageSrc}
          fill={true}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && <ImageLoader />}
      </div>
      <H1>{pokemon.name}</H1>
    </Card>
  );
};
