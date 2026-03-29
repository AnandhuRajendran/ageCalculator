import { validateFormat } from "../ageCalculator";

describe("validateFormat", () => {
  test("rejects invalid format", () => {
    expect(validateFormat("2020-01-01")).toBe(false);
    expect(validateFormat("01/01/2020")).toBe(false);
    expect(validateFormat("abcd/ef/gh")).toBe(false);
  });

  test("rejects impossible dates", () => {
    expect(validateFormat("2020/02/30")).toBe(false); // Feb 30
    expect(validateFormat("2020/13/01")).toBe(false); // Month 13
    expect(validateFormat("2020/01/32")).toBe(false); // Day 32
  });

  test("accepts valid dates", () => {
    expect(validateFormat("2020/02/29")).toBe(true); // Leap year
    expect(validateFormat("2021/12/31")).toBe(true);
    expect(validateFormat("2000/01/01")).toBe(true);
  });
});