import { DEFAULT_FONT, FONT_IDS, parseFontCookie } from "./fonts";

describe("parseFontCookie", () => {
  it("returns the value when it is a valid font ID", () => {
    for (const id of FONT_IDS) {
      expect(parseFontCookie(id)).toBe(id);
    }
  });

  it("returns the default font when value is undefined", () => {
    expect(parseFontCookie(undefined)).toBe(DEFAULT_FONT);
  });

  it("returns the default font when value is an unrecognised string", () => {
    expect(parseFontCookie("wingdings")).toBe(DEFAULT_FONT);
  });

  it("returns the default font when value is an empty string", () => {
    expect(parseFontCookie("")).toBe(DEFAULT_FONT);
  });
});
