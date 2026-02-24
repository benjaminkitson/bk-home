import { twMerge } from "tailwind-merge";
import { IconType } from "react-icons";

interface IconButtonProps {
  Icon: IconType;
  className?: string;
  iconClassName?: string;
  onClick?: () => void;
  "aria-label"?: string;
  "data-testid"?: string;
}

const iconButtonClasses =
  "text-white/70 transition duration-300 hover:scale-110 hover:text-white";

export const ICON_BUTTON_GROUP_CLASSES =
  "group-hover:scale-110 group-hover:text-white";

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  className,
  iconClassName,
  onClick,
  ...rest
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        `flex items-center justify-center ${iconButtonClasses} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50`,
        className,
      )}
      {...rest}
    >
      <Icon className={twMerge("text-3xl transition duration-300 md:text-4xl", iconClassName)} />
    </button>
  );
};
