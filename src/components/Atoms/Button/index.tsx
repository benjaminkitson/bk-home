import { twMerge } from "tailwind-merge";

type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "blue" | "gray";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => any;
  className?: string;
  buttonColor: ButtonColor;
  buttonSize: ButtonSize;
}

export const Button = ({
  children,
  onClick,
  className,
  buttonColor,
  buttonSize,
}: ButtonProps) => {
  const buttonSizeMap: Record<ButtonSize, string> = {
    sm: "min-w-20 px-2 w-fit h-10 text-lg rounded-md",
    md: "min-w-52 px-4 w-fit h-14 text-xl rounded-lg",
    lg: "min-w-60 px-6 w-fit h-18 text-3xl rounded-xl",
  };

  const buttonColorMap: Record<ButtonColor, string> = {
    blue: "bg-blue-400 hover:bg-blue-500",
    gray: "bg-gray-100 hover:bg-gray-300",
  };

  const [color, size] = [
    buttonColor ? buttonColorMap[buttonColor] : "",
    buttonSize ? buttonSizeMap[buttonSize] : "",
  ];

  const classes = twMerge(`${color} ${size}`, className);

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
