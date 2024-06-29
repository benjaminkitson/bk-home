import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { TextInputProps, textInputClasses } from "./TextInput";

interface PasswordInputProps extends TextInputProps {}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  className,
  ...props
}) => {
  const classes = twMerge(textInputClasses, className);

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <input
        className={classes}
        {...props}
        type={passwordVisible ? undefined : "password"}
      />
      <span
        className="ml-1 mt-[-10px] cursor-pointer text-xs hover:underline"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ? "Hide" : "Show"} password
      </span>
    </>
  );
};
