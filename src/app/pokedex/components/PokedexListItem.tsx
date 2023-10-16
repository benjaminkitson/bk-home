import { P } from "@/components/Atoms/Typography";
import { Pokemon } from "./Content";
import Image from "next/image";

interface PokedexListItemProps {
  pokemon: Pokemon;
}

export const PokedexListItem: React.FC<PokedexListItemProps> = ({
  pokemon,
}) => {
  return (
    <div className="my-4 flex h-28 w-full items-center rounded-xl bg-blue-300/30 p-10">
      <Image
        width="70"
        height="70"
        src={pokemon.thumbImageSrc}
        alt={pokemon.name}
        quality={50}
        priority
      />
      <P className="ml-7">{`#${pokemon.id}: ${pokemon.name}`}</P>
    </div>
  );
};
