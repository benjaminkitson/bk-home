import { TextInput } from "@/components/Atoms/TextInput/TextInput";
import { H1 } from "@/components/Atoms/Typography";
import { useState } from "react";
import {
  AuthFieldsWrapper,
  AuthModalHeading,
  AuthPrimaryModalButton,
} from "../components";
import { useAuthQuery } from "../hooks";

interface VerifyEmailProps {
  email: string;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({ email }) => {
  const [code, setCode] = useState("");

  const { queryFn, isError, message } = useAuthQuery(
    process.env.NEXT_PUBLIC_AUTH_ROOT + "/verify",
  );

  return (
    <>
      <AuthModalHeading>Verify Email</AuthModalHeading>
      <AuthFieldsWrapper>
        <TextInput
          onChange={(e) => setCode(e.target.value)}
          value={code}
          placeholder="Verification Code"
        />
        {/* {isVerifyEmailSuccess && <H1>Successfulyl verified!</H1>} */}
        {isError && <H1>Some error</H1>}
      </AuthFieldsWrapper>
      <AuthPrimaryModalButton
        onClick={async () => {
          const res = await queryFn({ code, email });
          // if (res.ok) {
          //   return setIsVerifyEmailSuccess;
          // }
          // setIsVerifyEmailError(true);
        }}
      >
        Verify
      </AuthPrimaryModalButton>
    </>
  );
};
