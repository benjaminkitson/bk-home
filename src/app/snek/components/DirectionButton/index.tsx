import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
} from "react-icons/bs";
import { Direction } from "../../page";
import { appendClasses } from "@/utils/appendClasses";

interface DirectionButtonProps {
  onClick: () => void;
  direction: Direction;
  className?: string;
}

const getDirectionIcon = (direction: Direction) => {
  switch (direction) {
    case "RIGHT":
      return <BsChevronRight />;
    case "LEFT":
      return <BsChevronLeft />;
    case "UP":
      return <BsChevronUp />;
    case "DOWN":
      return <BsChevronDown />;
  }
};

export const DirectionButton: React.FC<DirectionButtonProps> = ({
  onClick,
  direction,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={appendClasses(
        "flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold",
        className,
      )}
    >
      {getDirectionIcon(direction)}
    </button>
  );
};
