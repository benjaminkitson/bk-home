import { appendClasses } from "@/utils/appendClasses";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const H2: React.FC<TypographyProps> = ({ children, className }) => {
  return <h2 className={appendClasses("", className)}>{children}</h2>;
};

export const P: React.FC<TypographyProps> = ({ children, className }) => {
  return <p className={appendClasses("text-sm", className)}>{children}</p>;
};
