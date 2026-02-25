import { Card } from "@/components/Molecules/Card";
import Image from "next/image";
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
        "h-28 items-center gap-5 overflow-hidden px-6 py-4",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
        <Image
          width="64"
          height="64"
          src={pokemon.thumbImageSrc}
          alt={pokemon.name}
          quality={50}
          priority={prioritiseImage}
        />
      </div>
      <div className="relative z-10 min-w-0 flex-1">
        <span className="text-sm font-medium text-white/80">
          #{pokemon.id}:
        </span>{" "}
        <span className="font-semibold tracking-tight">{pokemon.name}</span>
      </div>
    </Card>
  );
};
