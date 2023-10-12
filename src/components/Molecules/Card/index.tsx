import Link from "next/link";
import { twMerge } from "tailwind-merge";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, href }) => {
  const cardClasses = "flex w-full bg-white rounded-xl";

  return href ? (
    <Link className={twMerge(cardClasses, className)} href={href}>
      {children}
    </Link>
  ) : (
    <div className={twMerge(cardClasses, className)}>{children}</div>
  );
};
