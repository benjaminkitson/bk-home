import { twMerge } from "tailwind-merge";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, href }) => {
  const cardClasses = "flex w-full bg-white rounded-xl";

  return href ? (
    <a className={twMerge(cardClasses, className)} href={href}>
      {children}
    </a>
  ) : (
    <div className={twMerge(cardClasses, className)}>{children}</div>
  );
};
