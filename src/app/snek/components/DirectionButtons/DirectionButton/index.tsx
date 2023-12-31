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
        "flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-bold",
        className,
      )}
      buttonSize="lg"
      buttonColor="blue"
    >
      {getDirectionIcon(direction)}
    </Button>
  );
};
