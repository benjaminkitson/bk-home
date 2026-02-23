import { AuthContextProvider } from "@/AuthContext";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { cookies } from "next/headers";

async function getToken() {
  const token = cookies().get("bkAuth")?.value;
  return token;
}

const roboto = Roboto({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Benjamin Kitson",
  description: "Benjamin Kitson developer site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getToken();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthContextProvider token={token}>
          <div className="relative min-h-screen w-screen text-white">
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-700 to-sky-500"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-bl from-indigo-700 to-cyan-400 animate-gradient-crossfade pointer-events-none"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-tr from-violet-700 to-sky-500 animate-gradient-crossfade-slow pointer-events-none"
              aria-hidden
            />
            <div className="relative z-10">{children}</div>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
