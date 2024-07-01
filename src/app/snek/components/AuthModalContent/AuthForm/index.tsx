import { Button } from "@/components/Atoms/Button";
import { H1 } from "@/components/Atoms/Typography";

interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: () => void;
  text: string;
}

// The children here should be the form fields
export const AuthForm: React.FC<AuthFormProps> = ({
  children,
  onSubmit,
  text,
}) => {
  return (
    <>
      <H1 className="mb-7">{text}</H1>
      <div className="flex w-3/4 flex-col justify-center">{children}</div>
      <Button
        buttonColor="blue"
        buttonSize="md"
        className="my-5"
        onClick={onSubmit}
      >
        {text}
      </Button>
    </>
  );
};
