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
      className={className}
      target={openInCurrentTab ? undefined : "_blank"}
      data-testid="icon-link-a"
    >
      <Icon
        className={twMerge(
          iconClassName,
          "fill-gray-100 text-4xl transition duration-500 hover:scale-90 hover:fill-purple-600",
        )}
        data-testid="icon-link-icon"
      />
    </a>
  );
};
