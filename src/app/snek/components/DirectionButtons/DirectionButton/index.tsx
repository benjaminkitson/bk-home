import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
} from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Atoms/Button";
import { Direction } from "@/app/snek/types";

interface DirectionButtonProps {
  onClick: () => void;
  direction: Direction;
  className?: string;
}

const getDirectionIcon = (direction: Direction) => {
  switch (direction) {
    case "RIGHT":
      return <BsChevronRight data-testid="direction-icon-right" />;
    case "LEFT":
      return <BsChevronLeft data-testid="direction-icon-left" />;
    case "UP":
      return <BsChevronUp data-testid="direction-icon-up" />;
    case "DOWN":
      return <BsChevronDown data-testid="direction-icon-down" />;
  }
};

export const DirectionButton: React.FC<DirectionButtonProps> = ({
  onClick,
  direction,
  className,
}) => {
  return (
    <Button
      onClick={onClick}
      className={twMerge(
        "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-sky-600 font-bold shadow-lg ring-2 ring-blue-400/50 hover:shadow-xl hover:ring-sky-300/60",
        className,
      )}
      buttonSize="lg"
      buttonColor="blue"
    >
      {getDirectionIcon(direction)}
    </Button>
  );
};
