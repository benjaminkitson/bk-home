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
  const isInteractive = !!href || !!onClick;

  const cardClasses = twMerge(
    "flex w-full rounded-xl bg-gradient-to-br from-blue-600/70 to-sky-500/60 ring-1 ring-white/20 text-white shadow-xl",
    isInteractive && "group relative",
    className,
  );

  const hoverOverlay = isInteractive && (
    <span
      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-tl from-sky-400/30 to-blue-800/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      aria-hidden
    />
  );

  return href ? (
    <Link className={cardClasses} href={href} onClick={onClick}>
      {hoverOverlay}
      {children}
    </Link>
  ) : (
    <div onClick={onClick} className={cardClasses}>
      {hoverOverlay}
      {children}
    </div>
  );
};
