import { H2 } from "@/components/Atoms/Typography";
import { Pokemon } from "./Content";
import Image from "next/image";

interface PokedexListItemProps {
  pokemon: Pokemon;
}

export const PokedexListItem: React.FC<PokedexListItemProps> = ({
  pokemon,
}) => {
  return (
    <div className="my-4 flex h-36 w-full items-center rounded-xl bg-blue-300/30 p-10">
      <H2>{pokemon.name}</H2>
      <Image
        width="100"
        height="100"
        src={pokemon.thumbImageSrc}
        alt={pokemon.name}
      ></Image>
    </div>
  );
};
