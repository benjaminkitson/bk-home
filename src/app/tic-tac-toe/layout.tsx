import "../globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={roboto.className}>
        <div className="relative z-10 h-screen w-screen bg-gradient-to-r from-blue-500 to-cyan-500 lg:h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
