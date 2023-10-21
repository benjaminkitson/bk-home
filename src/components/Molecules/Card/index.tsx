import Link from "next/link";
import { twMerge } from "tailwind-merge";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => unknown;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  href,
  onClick,
}) => {
  const cardClasses = "flex w-full bg-white rounded-xl";

  return href ? (
    <Link
      className={twMerge(cardClasses, className)}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  ) : (
    <div onClick={onClick} className={twMerge(cardClasses, className)}>
      {children}
    </div>
  );
};
