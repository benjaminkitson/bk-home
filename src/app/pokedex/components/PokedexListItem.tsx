import { P } from "@/components/Atoms/Typography";
import Image from "next/image";
import { Card } from "@/components/Molecules/Card";
import { twMerge } from "tailwind-merge";
import { Pokemon } from "../types";

interface PokedexListItemProps {
  pokemon: Pokemon;
  className?: string;
  onClick: () => unknown;
  prioritiseImage: boolean;
}

export const PokedexListItem: React.FC<PokedexListItemProps> = ({
  pokemon,
  className,
  onClick,
  prioritiseImage,
}) => {
  return (
    <Card
      className={twMerge(
        "h-28 items-center justify-center rounded-xl bg-blue-300/30 px-6 transition-all hover:bg-blue-300/50",
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
        priority={prioritiseImage}
      />
      <P className="flex grow justify-center">{`#${pokemon.id}: ${pokemon.name}`}</P>
    </Card>
  );
};
