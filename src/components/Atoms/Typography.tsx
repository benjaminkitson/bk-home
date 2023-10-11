import { appendClasses } from "@/utils/appendClasses";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H1: React.FC<TypographyProps> = ({ children, className }) => {
  return <h1 className={appendClasses("text-5xl", className)}>{children}</h1>;
};

export const H2: React.FC<TypographyProps> = ({ children, className }) => {
  return <h2 className={appendClasses("text-3xl", className)}>{children}</h2>;
};

export const P: React.FC<TypographyProps> = ({ children, className }) => {
  return <p className={appendClasses("text-lg", className)}>{children}</p>;
};
