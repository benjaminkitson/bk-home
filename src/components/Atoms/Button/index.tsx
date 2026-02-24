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
    sm: "min-w-16 px-2 w-fit h-8 text-base rounded-xl shadow-lg hover:shadow-xl",
    md: "min-w-44 px-3 w-fit h-12 text-lg rounded-xl shadow-lg hover:shadow-xl",
    lg: "min-w-32 px-5 w-fit h-14 text-xl rounded-xl shadow-lg hover:shadow-xl",
  };

  const buttonColorMap: Record<ButtonColor, string> = {
    blue: "bg-gradient-to-br from-blue-400 to-sky-600 ring-1 ring-inset ring-white/10",
    gray: "bg-gradient-to-br from-white/30 to-white/15 text-white ring-1 ring-inset ring-white/20",
  };

  const showOverlay = !isDisabled;

  const [color, size] = [
    buttonColor ? buttonColorMap[buttonColor] : "",
    buttonSize ? buttonSizeMap[buttonSize] : "",
  ];

  const classes = twMerge(
    "group relative origin-center transition-all duration-200 ease-in-out",
    !isDisabled && "hover:scale-110",
    `${isDisabled ? "bg-gray-100" : color} ${size}`,
    className,
  );

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={isLoading || disabled}
    >
      {showOverlay && (
        <span
          className={twMerge(
            "absolute inset-px overflow-hidden rounded-xl opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100",
            buttonColor === "blue"
              ? "bg-gradient-to-tl from-sky-500 to-blue-700"
              : "bg-white/10",
          )}
          aria-hidden
        />
      )}
      <span className="relative z-10">{children}</span>
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
