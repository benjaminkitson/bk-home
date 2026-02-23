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
  const cardClasses =
    "flex w-full rounded-xl bg-slate-50 border border-slate-200/80 text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500";

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
