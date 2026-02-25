import moment from "moment";
import { getDailyWord, WORDS } from "./words";

// Fix moment() (no-arg) to always return 2025-01-01 (the epoch date)
jest.mock("moment", () => {
  const actual = jest.requireActual("moment");
  const mock = (dateStr?: string) =>
    dateStr ? actual(dateStr) : actual("2025-01-01");
  Object.assign(mock, actual);
  return mock;
});

describe("getDailyWord", () => {
  it("returns a string from the word list", () => {
    expect(WORDS).toContain(getDailyWord());
  });

  it("returns the same word on repeated calls (deterministic)", () => {
    expect(getDailyWord()).toBe(getDailyWord());
  });

  it("returns WORDS[0] on the epoch date itself (day index 0)", () => {
    expect(getDailyWord()).toBe(WORDS[0]);
  });

  it("cycles back to WORDS[0] after WORDS.length days", () => {
    const actual = jest.requireActual<typeof moment>("moment");
    const epoch = actual("2025-01-01");
    const cycleDate = epoch.clone().add(WORDS.length, "days");
    const dayIndex = cycleDate.diff(epoch, "days");
    expect(WORDS[dayIndex % WORDS.length]).toBe(WORDS[0]);
  });
});
