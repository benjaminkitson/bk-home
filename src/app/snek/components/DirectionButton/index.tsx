import {
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
} from "react-icons/bs";
import { Direction } from "../../page";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/Atoms/Button";
import { IconType } from "react-icons";

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
