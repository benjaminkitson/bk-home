import { setAuthToken } from "@/app/utils/auth";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

type AuthQueryInput = Record<string, string>;

// A wrapper around useMutation with additional state management and error handling
export const useAuthQuery = (endpoint: string) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: (data: AuthQueryInput) => {
      try {
        return fetch(endpoint, {
          method: "POST",
          body: JSON.stringify(data),
        });
      } catch (err) {
        throw err;
      }
    },
    onError: () => {
      setIsError(true);
    },
    retry: 0,
  });

  // Handles the query and deals with the state - returns an isSuccessful boolean
  const queryFn = async (data: AuthQueryInput) => {
    let res;
    try {
      res = await mutateAsync(data);
      const resData = await res.json();
      setMessage(resData.message);
      if (resData.token) {
        setAuthToken(resData.token);
      }
      setIsError(!res.ok);
      return res.ok;
    } catch (e) {
      console.error(e);
      setMessage("Something went wrong client-side!");
      setIsError(true);
      return false;
    }
  };

  const clearState = useCallback(() => {
    setIsError(false);
    setMessage("");
  }, []);

  return { queryFn, isError, message, clearState };
};
