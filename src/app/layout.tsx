// import { AuthContextProvider } from "@/AuthContext";
import { FontAndSettingsWrapper } from "@/components/FontAndSettingsWrapper";
import { MouseGlow } from "@/components/MouseGlow";
import { type FontId, parseFontCookie } from "@/SettingsContext/fonts";
import type { Metadata } from "next";
import {
  Comic_Neue,
  DM_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  Roboto,
  Sora,
} from "next/font/google";
import "./globals.css";

import { cookies } from "next/headers";

// async function getToken() {
//   const token = cookies().get("bkAuth")?.value;
//   return token;
// }

const roboto = Roboto({
  weight: ["300", "400"],
  subsets: ["latin"],
  display: "swap",
});
const plusJakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const outfit = Outfit({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const sora = Sora({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const fontMap = {
  roboto: roboto.className,
  plusJakarta: plusJakarta.className,
  dmSans: dmSans.className,
  outfit: outfit.className,
  sora: sora.className,
  comicSans: comicNeue.className,
} satisfies Record<FontId, string>;

export const metadata: Metadata = {
  title: "Benjamin Kitson",
  description: "Benjamin Kitson developer site",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const token = await getToken();
  const fontCookie = cookies().get("bk-home-font")?.value;
  const initialFontId = parseFontCookie(fontCookie);

  return (
    <html lang="en">
      <body>
        {/* <AuthContextProvider token={token}> */}
          <FontAndSettingsWrapper fontMap={fontMap} initialFontId={initialFontId}>
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
            <MouseGlow />
            <div className="relative z-10">{children}</div>
            </div>
          </FontAndSettingsWrapper>
        {/* </AuthContextProvider> */}
      </body>
    </html>
  );
}
