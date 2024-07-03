import { AuthContext } from "@/AuthContext";
import { Button } from "@/components/Atoms/Button";
import { PasswordInput } from "@/components/Atoms/TextInput/PasswordInput";
import { TextInput } from "@/components/Atoms/TextInput/TextInput";
import { P } from "@/components/Atoms/Typography";
import { useContext, useReducer, useState } from "react";
import { AuthForm } from "./AuthForm";
import { useAuthQuery } from "./hooks/useAuthQuery";
import { fieldsReducer, fieldsState } from "./hooks/useFieldsState";

interface AuthModalContentProps {
  isInitiallySigningUp: boolean;
  exitAuth: () => void;
}

type AuthModalState = "SIGN_UP" | "SIGN_IN" | "VERIFY_EMAIL";

const Loader = () => {
  return (
    <div
      className="absolute left-0 top-0 z-50 h-full w-full rounded-xl bg-white opacity-70"
      data-testid="auth-loader"
    />
  );
};

export const AuthModalContent: React.FC<AuthModalContentProps> = ({
  isInitiallySigningUp,
  exitAuth,
}) => {
  const [authModalState, setAuthModalState] = useState<AuthModalState>(
    isInitiallySigningUp ? "SIGN_UP" : "SIGN_IN",
  );

  const [fields, dispatch] = useReducer(fieldsReducer, fieldsState);

  const signIn = useAuthQuery(process.env.NEXT_PUBLIC_AUTH_ROOT + "/signin");
  const signUp = useAuthQuery(process.env.NEXT_PUBLIC_AUTH_ROOT + "/signup");
  const verify = useAuthQuery(process.env.NEXT_PUBLIC_AUTH_ROOT + "/verify");

  const { setIsAuthenticated } = useContext(AuthContext);

  if (authModalState === "SIGN_IN") {
    return (
      <>
        {signIn.isLoading && <Loader />}
        <AuthForm
          text="Sign In"
          onSubmit={async () => {
            const isSuccess = await signIn.queryFn({
              email: fields["SIGN_IN_EMAIL"],
              password: fields["SIGN_IN_PASSWORD"],
            });
            if (isSuccess) {
              setIsAuthenticated(true);
              exitAuth();
            }
          }}
        >
          <TextInput
            onChange={(e) =>
              dispatch({ type: "SIGN_IN_EMAIL", value: e.target.value })
            }
            value={fields["SIGN_IN_EMAIL"]}
            placeholder="Email"
          />
          <PasswordInput
            onChange={(e) =>
              dispatch({ type: "SIGN_IN_PASSWORD", value: e.target.value })
            }
            value={fields["SIGN_IN_PASSWORD"]}
            placeholder="Password"
          />
        </AuthForm>
        <Button
          buttonColor="gray"
          buttonSize="sm"
          onClick={() => setAuthModalState("SIGN_UP")}
        >
          Sign Up
        </Button>
      </>
    );
  }

  if (authModalState === "SIGN_UP") {
    return (
      <>
        {signUp.isLoading && <Loader />}
        <AuthForm
          text="Sign Up"
          onSubmit={async () => {
            const isSuccess = await signUp.queryFn({
              email: fields["SIGN_UP_EMAIL"],
              password: fields["SIGN_UP_PASSWORD"],
            });
            if (isSuccess) {
              setAuthModalState("VERIFY_EMAIL");
            }
          }}
        >
          <TextInput
            onChange={(e) =>
              dispatch({ type: "SIGN_UP_EMAIL", value: e.target.value })
            }
            value={fields["SIGN_UP_EMAIL"]}
            placeholder="Email"
          />
          <PasswordInput
            onChange={(e) =>
              dispatch({ type: "SIGN_UP_PASSWORD", value: e.target.value })
            }
            value={fields["SIGN_UP_PASSWORD"]}
            placeholder="Password"
          />
          {signUp.isError && <P>{signUp.message}</P>}
        </AuthForm>
        <Button
          buttonColor="gray"
          buttonSize="sm"
          onClick={() => setAuthModalState("SIGN_IN")}
          isLoading={signUp.isLoading}
        >
          Sign In
        </Button>
      </>
    );
  }

  if (authModalState === "VERIFY_EMAIL") {
    return (
      <>
        {verify.isLoading && <Loader />}
        <AuthForm
          text="Verify Email"
          onSubmit={async () => {
            const isSuccess = await verify.queryFn({
              // email verification requires resubmission of the sign up email
              email: fields["SIGN_UP_EMAIL"],
              code: fields["VERIFY_CODE"],
            });
            if (isSuccess) {
              dispatch({ type: "RESET_STATE" });
              setAuthModalState("SIGN_IN");
            }
          }}
        >
          <TextInput
            onChange={(e) =>
              dispatch({ type: "VERIFY_CODE", value: e.target.value })
            }
            value={fields["VERIFY_CODE"]}
            placeholder="Verification Code"
          />
        </AuthForm>
        <div className="flex">
          <Button
            buttonColor="gray"
            buttonSize="sm"
            className="mr-3"
            onClick={() => setAuthModalState("SIGN_IN")}
            isLoading={verify.isLoading}
          >
            Back
          </Button>
          <Button
            buttonColor="gray"
            buttonSize="sm"
            className="w-fit"
            onClick={() => setAuthModalState("SIGN_IN")}
            isLoading={verify.isLoading}
          >
            Sign In Instead
          </Button>
        </div>
      </>
    );
  }

  // this can't really ever be reached
  throw new Error("Unexpected modal state");
};
