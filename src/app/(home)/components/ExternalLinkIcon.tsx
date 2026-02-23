import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface ExternalLinkIconProps {
  href: string;
  Icon: IconType;
  className?: string;
  iconClassName?: string;
  openInCurrentTab?: boolean;
}

export const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({
  href,
  className,
  Icon,
  iconClassName,
  openInCurrentTab,
}) => {
  return (
    <a
      href={href}
      className={twMerge(
        "rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700",
        className,
      )}
      target={openInCurrentTab ? undefined : "_blank"}
      rel={openInCurrentTab ? undefined : "noopener noreferrer"}
    >
      <Icon
        className={twMerge(
          iconClassName,
          "fill-gray-100 text-4xl transition duration-500 hover:scale-90 hover:fill-indigo-600",
        )}
      />
    </a>
  );
};
