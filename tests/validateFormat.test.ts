import { validateFormat } from "../ageCalculator";

describe("validateFormat", () => {
  test("rejects invalid format", () => {
    expect(validateFormat("2020-01-01")).toBe(false);
  });

  test("rejects impossible dates", () => {
    expect(validateFormat("2020/02/30")).toBe(false);
  });

  test("accepts valid date", () => {
    expect(validateFormat("2020/02/29")).toBe(true);
  });
});
