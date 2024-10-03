import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthModalContent } from ".";

// The async mocking stuff seems a bit weird here but also works?
describe("AuthForm sign up state", () => {
  const mockExitAuth = jest.fn(() => undefined);
  const queryClient = new QueryClient();

  function delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  function mockFetch({ ok, message }: { ok: boolean; message: string }) {
    global.fetch = jest.fn(async () => {
      // Simulate short network delay
      await delay(100);
      return {
        ok,
        json: async () => {
          return {
            message,
          };
        },
      } as unknown as Response;
    });
  }

  beforeEach(() => {
    // Unless specified in the test, assume fetch operation is successful
    mockFetch({ ok: true, message: "Success" });

    render(
      <QueryClientProvider client={queryClient}>
        <AuthModalContent isInitiallySigningUp={true} exitAuth={mockExitAuth} />
      </QueryClientProvider>,
    );
  });

  it("renders the sign up heading", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Sign Up");
  });

  it("updates the email input state when text is typed", async () => {
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "some_email");
    await waitFor(() => {
      expect(emailInput).toHaveAttribute("value", "some_email");
    });
  });

  it("updates the password input state when text is typed", async () => {
    const passwordInput = screen.getByPlaceholderText("Email");
    userEvent.type(passwordInput, "secret_password");
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("value", "secret_password");
    });
  });

  it("switches to the sign in view when the sign in button is clicked", () => {
    const signInButton = screen.getByRole("button", {
      name: /Sign In/i,
    });
    act(() => {
      signInButton.click();
    });
    const newHeading = screen.getByRole("heading");
    expect(newHeading).toHaveTextContent("Sign In");
  });

  it("switches to the verify view when sign up is successful", async () => {
    const signUpButton = screen.getByRole("button", {
      name: /Sign Up/i,
    });
    act(() => {
      signUpButton.click();
    });
    const newHeading = await waitFor(() =>
      screen.getByRole("heading", {
        name: /Verify Email/i,
      }),
    );
    expect(newHeading).toBeInTheDocument();
  });

  it("shows the loader when the the primary button is clicked", async () => {
    const signUpButton = screen.getByRole("button", {
      name: /Sign Up/i,
    });
    act(() => {
      signUpButton.click();
    });
    const loader = await waitFor(() => {
      return screen.getByTestId("auth-loader");
    });
    expect(loader).toBeInTheDocument();
  });

  it("switches to the verify view when sign up is successful", async () => {
    const signUpButton = screen.getByRole("button", {
      name: /Sign Up/i,
    });
    act(() => {
      signUpButton.click();
    });
    const newHeading = await waitFor(() =>
      screen.getByRole("heading", {
        name: /Verify Email/i,
      }),
    );
    expect(newHeading).toBeInTheDocument();
  });

  // TODO: Implement this error stuff
  // it("shows the error message when request fails", async () => {
  //   mockFetch({ ok: false, message: "I am error" });

  //   const signUpButton = screen.getByRole("button", {
  //     name: /Sign Up/i,
  //   });
  //   act(() => {
  //     signUpButton.click();
  //   });
  //   const error = await waitFor(() => {
  //     return screen.getByText("I am error");
  //   });
  //   expect(error).toBeInTheDocument();
  // });
});

describe("AuthForm sign in state", () => {
  const mockExitAuth = jest.fn(() => undefined);
  const queryClient = new QueryClient();

  function delay(t: number) {
    return new Promise((resolve) => setTimeout(resolve, t));
  }

  function mockFetch({ ok, message }: { ok: boolean; message: string }) {
    global.fetch = jest.fn(async () => {
      // Simulate short network delay
      await delay(100);
      return {
        ok,
        json: async () => {
          return {
            message,
          };
        },
      } as unknown as Response;
    });
  }

  beforeEach(() => {
    // Unless specified in the test, assume fetch operation is successful
    mockFetch({ ok: true, message: "Success" });
    jest.clearAllMocks();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthModalContent
          isInitiallySigningUp={false}
          exitAuth={mockExitAuth}
        />
      </QueryClientProvider>,
    );
  });

  it("renders the sign in heading", () => {
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Sign In");
  });

  it("updates the email input state when text is typed", async () => {
    const emailInput = screen.getByPlaceholderText("Email");
    userEvent.type(emailInput, "some_email");
    await waitFor(() => {
      expect(emailInput).toHaveAttribute("value", "some_email");
    });
  });

  it("updates the password input state when text is typed", async () => {
    const passwordInput = screen.getByPlaceholderText("Email");
    userEvent.type(passwordInput, "secret_password");
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("value", "secret_password");
    });
  });

  it("exits the auth flow when sign in is successful", async () => {
    const signInButton = screen.getByRole("button", {
      name: /Sign In/i,
    });
    act(() => {
      signInButton.click();
    });
    await waitFor(() => {
      expect(mockExitAuth).toHaveBeenCalledTimes(1);
    });
  });

  it("shows the loader when the the primary button is clicked", async () => {
    const signUpButton = screen.getByRole("button", {
      name: /Sign In/i,
    });
    act(() => {
      signUpButton.click();
    });
    const loader = await waitFor(() => {
      return screen.getByTestId("auth-loader");
    });
    expect(loader).toBeInTheDocument();
  });

  // it("switches to the verify view when sign up is successful", async () => {
  //   const signUpButton = screen.getByRole("button", {
  //     name: /Sign Up/i,
  //   });
  //   act(() => {
  //     signUpButton.click();
  //   });
  //   const newHeading = await waitFor(() =>
  //     screen.getByRole("heading", {
  //       name: /Verify Email/i,
  //     }),
  //   );
  //   expect(newHeading).toBeInTheDocument();
  // });

  // TODO: Implement this error stuff
  // it("shows the error message when request fails", async () => {
  //   mockFetch({ ok: false, message: "I am error" });

  //   const signUpButton = screen.getByRole("button", {
  //     name: /Sign Up/i,
  //   });
  //   act(() => {
  //     signUpButton.click();
  //   });
  //   const error = await waitFor(() => {
  //     return screen.getByText("I am error");
  //   });
  //   expect(error).toBeInTheDocument();
  // });
});
