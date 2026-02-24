export const FONT_IDS = [
  "roboto",
  "plusJakarta",
  "dmSans",
  "outfit",
  "sora",
  "comicSans",
] as const;
export type FontId = (typeof FONT_IDS)[number];
export const DEFAULT_FONT: FontId = "plusJakarta";
export type FontMap = Record<FontId, string>;

export const FONT_DISPLAY_NAMES: Record<FontId, string> = {
  roboto: "Roboto",
  plusJakarta: "Plus Jakarta Sans",
  dmSans: "DM Sans",
  outfit: "Outfit",
  sora: "Sora",
  comicSans: "Comic Sans",
};

export function parseFontCookie(cookieValue?: string): FontId {
  if (cookieValue && FONT_IDS.includes(cookieValue as FontId)) {
    return cookieValue as FontId;
  }
  return DEFAULT_FONT;
}
