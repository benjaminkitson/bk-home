import { twMerge } from "tailwind-merge";

export interface TextInputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

export const textInputClasses =
  "p-2 h-10 w-full rounded-md border border-gray-600 mb-3";

export const TextInput: React.FC<TextInputProps> = ({
  className,
  ...props
}) => {
  const classes = twMerge(textInputClasses, className);

  return <input className={classes} {...props} />;
};
