import { twMerge } from "tailwind-merge";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h1 className={twMerge("text-3xl md:text-5xl", className)}>{children}</h1>
  );
};

export const H2: React.FC<TypographyProps> = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-xl md:text-3xl", className)}>{children}</h2>
  );
};

export const P: React.FC<TypographyProps> = ({ children, className }) => {
  return <p className={twMerge("text-sm md:text-xl", className)}>{children}</p>;
};
