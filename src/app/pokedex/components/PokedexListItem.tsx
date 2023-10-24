import { P } from "@/components/Atoms/Typography";
import Image from "next/image";
import { Card } from "@/components/Molecules/Card";
import { twMerge } from "tailwind-merge";
import { Pokemon } from "../types";

interface PokedexListItemProps {
  pokemon: Pokemon;
  className?: string;
  onClick: () => unknown;
}

export const PokedexListItem: React.FC<PokedexListItemProps> = ({
  pokemon,
  className,
  onClick,
}) => {
  return (
    <Card
      className={twMerge(
        "h-28 items-center justify-center rounded-xl bg-blue-300/30 px-6",
        className,
      )}
      onClick={onClick}
    >
      <Image
        width="70"
        height="70"
        src={pokemon.thumbImageSrc}
        alt={pokemon.name}
        quality={50}
        priority
      />
      <P className="flex grow justify-center">{`#${pokemon.id}: ${pokemon.name}`}</P>
    </Card>
  );
};
