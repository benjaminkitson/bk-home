import { Button } from "@/components/Atoms/Button";
import { H1 } from "@/components/Atoms/Typography";

// A handful of components to centralise the styling of the different auth modal content options

interface StylingWrapperProps {
  children: React.ReactNode;
}

export const AuthFieldsWrapper: React.FC<StylingWrapperProps> = ({
  children,
}) => {
  return <div className="flex w-3/4 flex-col justify-center">{children}</div>;
};

interface AuthModalHeadingProps {
  children: string;
}

export const AuthModalHeading: React.FC<AuthModalHeadingProps> = ({
  children,
}) => {
  return <H1 className="mb-7">{children}</H1>;
};

interface AuthPrimaryModalButtonProps {
  onClick: () => void;
  children: string;
}

export const AuthPrimaryModalButton: React.FC<AuthPrimaryModalButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <Button
      buttonColor="blue"
      buttonSize="md"
      className="my-5"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
