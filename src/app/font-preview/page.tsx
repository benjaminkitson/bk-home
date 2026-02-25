import {
  Comic_Neue,
  DM_Sans,
  Outfit,
  Plus_Jakarta_Sans,
  Roboto,
  Sora,
} from "next/font/google";
import Link from "next/link";

const roboto = Roboto({ weight: ["300", "400"], subsets: ["latin"] });
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

const fonts = [
  { name: "Roboto", font: roboto },
  { name: "Plus Jakarta Sans (default)", font: plusJakarta },
  { name: "DM Sans", font: dmSans },
  { name: "Outfit", font: outfit },
  { name: "Sora", font: sora },
  { name: "Comic Sans", font: comicNeue },
] as const;

export default function FontPreviewPage() {
  return (
    <div className="relative min-h-screen text-white">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-sky-600"
        aria-hidden
      />
      <div className="relative z-10 px-6 py-12">
        <Link
          href="/"
          className="mb-8 inline-block text-white/80 underline underline-offset-2 hover:text-white"
        >
          ← Back home
        </Link>
        <h1 className="mb-2 text-2xl font-semibold text-white">Font preview</h1>
        <p className="mb-12 text-white/80">
          Same content in each font. Compare headings, list style, and body
          text.
        </p>
        <div className="flex flex-col gap-16">
          {fonts.map(({ name, font }) => (
            <section
              key={name}
              className={`rounded-2xl bg-white/10 p-8 backdrop-blur-sm ${font.className}`}
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-wider text-white/60">
                {name}
              </p>
              <h2 className="mb-1 text-4xl font-semibold md:text-5xl">
                Benjamin Kitson
              </h2>
              <h3 className="mb-4 text-xl font-medium text-white/90 md:text-2xl">
                Pokedex
              </h3>
              <p className="mb-2 text-lg font-medium text-white/90">
                #1: Bulbasaur
              </p>
              <p className="max-w-prose text-base font-light leading-relaxed text-white/90">
                There is a plant seed on its back right from the day this
                Pokémon is born. The seed slowly grows larger. Ability:
                Overgrow.
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
