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
  weight: "400",
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
          <div className="h-full min-h-screen w-screen bg-gradient-to-r from-blue-700 to-sky-500">
            {children}
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
