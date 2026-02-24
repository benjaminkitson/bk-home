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
        "group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700",
        className,
      )}
      target={openInCurrentTab ? undefined : "_blank"}
      rel={openInCurrentTab ? undefined : "noopener noreferrer"}
    >
      <Icon
        className={twMerge(
          "text-3xl text-white/70 transition duration-300 group-hover:scale-110 group-hover:text-white md:text-4xl",
          iconClassName,
        )}
      />
    </a>
  );
};
