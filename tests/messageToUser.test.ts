import { messageToUser } from "../ageCalculator";

describe("messageToUser", () => {
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  afterEach(() => logSpy.mockClear());

  test("detects future date", () => {
    messageToUser("3000/01/01", 0);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("You are not born yet!"));
  });

  test("detects leap year birthday", () => {
    messageToUser("2000/02/29", 24);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Born on Feb 29"));
  });
});
