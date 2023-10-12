type ButtonSize = "sm" | "md" | "lg";
type ButtonColor = "blue" | "gray";

type ButtonProps = {
  children?: string;
  onClick?: () => any;
  className?: string;
  buttonColor: ButtonColor;
  buttonSize: ButtonSize;
};

export const Button = ({
  children,
  onClick,
  className,
  buttonColor,
  buttonSize,
}: ButtonProps) => {
  const buttonSizeMap: Record<ButtonSize, string> = {
    sm: "w-20 h-5 text-lg",
    md: "w-52 h-24 text-xl",
    lg: "w-60 h-20 text-3xl",
  };

  const buttonColorMap: Record<ButtonColor, string> = {
    blue: "bg-blue-400 hover:bg-blue-500",
    gray: "bg-gray-100 hover:bg-gray-300",
  };

  const [color, size] = [
    buttonColor ? buttonColorMap[buttonColor] : "",
    buttonSize ? buttonSizeMap[buttonSize] : "",
  ];

  const classes = `rounded-lg m-5 ${color} ${size} ${className || ""}`.trim();

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
