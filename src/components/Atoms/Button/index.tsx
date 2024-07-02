import { twMerge } from "tailwind-merge";

type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "blue" | "gray";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => any;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  buttonColor: ButtonColor;
  buttonSize: ButtonSize;
}

export const Button = ({
  children,
  onClick,
  className,
  buttonColor,
  buttonSize,
  isLoading,
  disabled,
}: ButtonProps) => {
  // The button should always be disabled when in the loading state
  const isDisabled = isLoading || disabled;

  const buttonSizeMap: Record<ButtonSize, string> = {
    sm: "min-w-20 px-2 w-fit h-10 text-lg rounded-md",
    md: "min-w-52 px-4 w-fit h-14 text-xl rounded-lg",
    lg: "min-w-40 px-6 w-fit h-16 text-2xl rounded-lg",
  };

  const buttonColorMap: Record<ButtonColor, string> = {
    blue: "bg-blue-400 hover:bg-blue-500",
    gray: "bg-gray-100 hover:bg-gray-300",
  };

  const [color, size] = [
    buttonColor ? buttonColorMap[buttonColor] : "",
    buttonSize ? buttonSizeMap[buttonSize] : "",
  ];

  const classes = twMerge(
    `${isDisabled ? "bg-gray-100" : color} ${size} transition-colors`,
    className,
  );

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={isLoading || disabled}
    >
      {children}
    </button>
  );
};

// const Spinner = () => {
//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <FaHourglassHalf className="animate-spin" />
//     </div>
//   );
// };
