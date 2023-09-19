import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Benjamin Kitson",
  description: "Benjamin Kitson developer site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative z-10 min-h-screen w-screen bg-gradient-to-r from-blue-500 to-cyan-500 lg:h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
