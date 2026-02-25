"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ reset }: ErrorProps) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-gradient-to-r from-blue-700 to-sky-500 text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight">
          Something went wrong
        </h1>
        <p className="text-white/70">
          An unexpected error occurred. You can try again or come back later.
        </p>
        <button
          onClick={reset}
          className="rounded-xl bg-white/15 px-6 py-3 font-semibold ring-1 ring-white/20 transition hover:bg-white/25"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
