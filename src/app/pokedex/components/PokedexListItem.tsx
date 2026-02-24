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
        "flex h-28 items-center gap-5 rounded-xl bg-gradient-to-br from-blue-600/75 via-blue-500/72 to-sky-600/70 px-6 py-4 text-white shadow-md ring-1 ring-white/20 transition-all hover:from-blue-500/78 hover:via-blue-500/75 hover:to-sky-500/73 hover:shadow-lg hover:ring-white/30",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/15">
        <Image
          width="64"
          height="64"
          src={pokemon.thumbImageSrc}
          alt={pokemon.name}
          quality={50}
          priority={prioritiseImage}
        />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-sm font-medium text-white/80">
          #{pokemon.id}:
        </span>{" "}
        <span className="font-semibold tracking-tight">{pokemon.name}</span>
      </div>
    </Card>
  );
};
