import { memo } from "react";

interface CellProps {
  isSnek: boolean;
  isFood: boolean;
}

const UnmemoizedCell: React.FC<CellProps> = ({ isSnek, isFood }) => {
  console.log("render");

  const bg = isSnek
    ? "bg-blue-500"
    : isFood
    ? "bg-green-500"
    : "bg-white opacity-30";

  return (
    <div
      className={`mb-[2px] mr-[2px] h-2 w-2 rounded-sm border border-white ${bg}`}
    ></div>
  );
};

export const Cell = memo(UnmemoizedCell);