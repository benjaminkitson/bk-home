import { twMerge } from "tailwind-merge";
import { PokemonType } from "../types";

const typeGradients: Record<PokemonType, string> = {
  Grass: "from-green-500 to-emerald-600",
  Poison: "from-purple-500 to-purple-700",
  Fire: "from-orange-500 to-red-600",
  Flying: "from-cyan-400 to-sky-500",
  Water: "from-blue-500 to-blue-600",
  Bug: "from-amber-400 to-lime-600",
  Normal: "from-gray-400 to-gray-500",
  Electric: "from-yellow-400 to-yellow-600",
  Ground: "from-amber-700 to-yellow-800",
  Fairy: "from-pink-300 to-pink-500",
  Fighting: "from-orange-600 to-red-700",
  Psychic: "from-pink-500 to-purple-600",
  Rock: "from-gray-500 to-gray-600",
  Steel: "from-gray-300 to-slate-400",
  Ice: "from-blue-200 to-cyan-300",
  Ghost: "from-indigo-600 to-indigo-800",
  Dragon: "from-sky-500 to-indigo-600",
  Dark: "from-gray-800 to-gray-900",
};

interface TypeItemProps {
  className?: string;
  type: PokemonType;
}

export const TypeItem: React.FC<TypeItemProps> = ({ type, className }) => {
  return (
    <div
      className={twMerge(
        `flex w-20 items-center justify-center rounded-lg bg-gradient-to-br ${typeGradients[type]} px-2 py-1.5 text-sm font-medium text-white shadow-md ring-1 ring-black/10`,
        className,
      )}
    >
      {type}
    </div>
  );
};
