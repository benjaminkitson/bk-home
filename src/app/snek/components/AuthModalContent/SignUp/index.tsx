import { Button } from "@/components/Atoms/Button";
import { PasswordInput } from "@/components/Atoms/TextInput/PasswordInput";
import { TextInput } from "@/components/Atoms/TextInput/TextInput";
import { useEffect, useState } from "react";
import {
  AuthFieldsWrapper,
  AuthModalHeading,
  AuthPrimaryModalButton,
} from "../components";
import { useAuthQuery } from "../hooks";
import { VerifyEmail } from "./VerifyEmail";

export type HandleSignUpInput = {
  username: string;
  password: string;
  email: string;
};

interface SignUpProps {
  setSigningIn: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ setSigningIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVerifying, setIsVerifying] = useState(false);

  const { queryFn, message, isError, clearState } = useAuthQuery(
    process.env.NEXT_PUBLIC_AUTH_ROOT + "/signup",
  );

  useEffect(() => {
    clearState();
  }, [email, password, clearState]);

  if (isVerifying) {
    return (
      <>
        <VerifyEmail email={email} />
        <Button
          buttonColor="gray"
          buttonSize="sm"
          className="mb-5"
          onClick={() => setIsVerifying(false)}
        >
          Back
        </Button>
      </>
    );
  }
  return (
    <>
      <AuthModalHeading>Sign up</AuthModalHeading>
      <AuthFieldsWrapper>
        <TextInput
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        {isError && (
          <div className="mt-3 flex w-full items-center justify-center rounded-md border-2 border-red-500 bg-red-200 p-3">
            {message}
          </div>
        )}
      </AuthFieldsWrapper>
      <AuthPrimaryModalButton
        onClick={async () => {
          const isSuccess = await queryFn({
            email,
            password,
          });
          if (isSuccess) {
            setIsVerifying(true);
          }
        }}
      >
        Sign Up
      </AuthPrimaryModalButton>
    </>
  );
};
