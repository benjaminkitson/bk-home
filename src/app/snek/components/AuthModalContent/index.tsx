import { Button } from "@/components/Atoms/Button";
import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

interface AuthModalContentProps {
  isInitiallySigningUp: boolean;
}

export const AuthModalContent: React.FC<AuthModalContentProps> = ({
  isInitiallySigningUp,
}) => {
  const [isSigningUp, setIsSigningUp] = useState(isInitiallySigningUp);

  if (isSigningUp) {
    return (
      <>
        <SignUp setSigningIn={() => setIsSigningUp(false)} />
        <Button
          buttonColor="gray"
          buttonSize="sm"
          onClick={() => setIsSigningUp(false)}
        >
          Sign In
        </Button>
      </>
    );
  }

  return (
    <>
      <SignIn setSigningUp={() => setIsSigningUp(true)} />
      <Button
        buttonColor="gray"
        buttonSize="sm"
        onClick={() => setIsSigningUp(true)}
      >
        Sign Up
      </Button>
    </>
  );
};
