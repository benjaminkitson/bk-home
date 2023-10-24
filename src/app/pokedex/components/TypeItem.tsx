import { Type } from "typescript";
import { PokemonType } from "../types";
import { twMerge } from "tailwind-merge";

const bgTypeColors: Record<PokemonType, string> = {
  Grass: "bg-green-500",
  Poison: "bg-purple-500",
  Fire: "bg-orange-500",
  Flying: "bg-cyan-500",
  Water: "bg-blue-500",
  Bug: "bg-amber-400",
  Normal: "bg-gray-400",
  Electric: "bg-yellow-500",
  // gradient instead
  Ground: "bg-yellow-800",
  Fairy: "bg-pink-300",
  Fighting: "bg-orange-600",
  Psychic: "bg-pink-500",
  Rock: "bg-gray-700",
  Steel: "bg-gray-300",
  Ice: "bg-blue-200",
  Ghost: "bg-indigo-700",
  // gradient instead
  Dragon: "bg-lightblue-500",
  // contrast wont work
  Dark: "bg-gray-800",
};

interface TypeItemProps {
  className?: string;
  type: PokemonType;
}

export const TypeItem: React.FC<TypeItemProps> = ({ type, className }) => {
  return (
    <div
      className={twMerge(
        `${bgTypeColors[type]} bg- rounded-md border border-gray-400/50 px-2 py-1`,
        className,
      )}
    >
      {type}
    </div>
  );
};
