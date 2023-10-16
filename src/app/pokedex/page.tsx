"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Content } from "./components/Content";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

export default function Pokedex() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-green flex h-screen w-screen items-center justify-center">
        <Content />
      </div>
    </QueryClientProvider>
  );
}
