import { ageCalculator } from "../ageCalculator";

describe("ageCalculator", () => {
  test("calculates correct age for past birthday", () => {
    const dob = "2000/01/01";
    const age = ageCalculator(dob);
    const currentYear = new Date().getFullYear();
    expect(age).toBe(currentYear - 2000);
  });

  test("subtracts one year if birthday hasn't occurred yet this year", () => {
    const today = new Date();
    const dob = `${today.getFullYear() - 20}/${today.getMonth() + 2}/01`;
    const age = ageCalculator(dob);
    expect(age).toBe(19);
  });
});
