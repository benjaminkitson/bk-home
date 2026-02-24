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
      className={twMerge("group", className)}
      target={openInCurrentTab ? undefined : "_blank"}
      data-testid="icon-link-a"
    >
      <Icon
        className={twMerge(
          "text-3xl text-white/70 transition duration-300 group-hover:scale-110 group-hover:text-white md:text-4xl",
          iconClassName,
        )}
        data-testid="icon-link-icon"
      />
    </a>
  );
};
