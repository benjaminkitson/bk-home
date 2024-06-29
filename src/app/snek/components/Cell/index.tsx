import { memo } from "react";

interface CellProps {
  isSnek: boolean;
  isFood: boolean;
}

export const snekBgColour = "bg-blue-500";

export const foodBgColour = "bg-green-500";

export const standardBgColour = "bg-white";

const UnmemoizedCell: React.FC<CellProps> = ({ isSnek, isFood }) => {
  // First check if it's a snek
  const bg = isSnek
    ? snekBgColour
    : // If not, check if it's food
    isFood
    ? foodBgColour
    : // otherwise, use standard colour
      `${standardBgColour} opacity-30`;

  return (
    <div
      className={`mb-[2px] mr-[2px] h-2 w-2 rounded-sm border md:h-3 md:w-3 ${bg}`}
      data-testid="snek-cell"
    ></div>
  );
};

export const Cell = memo(UnmemoizedCell);
