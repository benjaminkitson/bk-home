import { PasswordInput } from "@/components/Atoms/TextInput/PasswordInput";
import { TextInput } from "@/components/Atoms/TextInput/TextInput";
import { useState } from "react";
import {
  AuthFieldsWrapper,
  AuthModalHeading,
  AuthPrimaryModalButton,
} from "./components";
import { useAuthQuery } from "./hooks";

interface SignInProps {
  setSigningUp: () => void;
}

export const SignIn: React.FC<SignInProps> = ({ setSigningUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { queryFn, message, isError } = useAuthQuery(
    process.env.NEXT_PUBLIC_AUTH_ROOT + "/signin",
  );

  return (
    <>
      <AuthModalHeading>Sign in</AuthModalHeading>
      <AuthFieldsWrapper>
        <TextInput
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Email"
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
      </AuthFieldsWrapper>
      <AuthPrimaryModalButton
        onClick={async () => {
          queryFn({
            username,
            password,
          });
        }}
      >
        Sign In
      </AuthPrimaryModalButton>
    </>
  );
};
