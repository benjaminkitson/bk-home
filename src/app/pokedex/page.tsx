"use client";

import dynamic from "next/dynamic";

// Because NextJS SSR can't "see" localStorage, a mismatch between client and server arises - just treat the pokedex as a client side page
// TODO: investigate just SSR-ing the enitre page since it's basically static anyway
const Content = dynamic(() => import("./components/Content"), {
  ssr: false,
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Pokedex() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-green flex h-screen w-screen items-center justify-center">
        <Content />
      </div>
    </QueryClientProvider>
  );
}
