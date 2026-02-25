"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 text-center">
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
    </div>
  );
}
