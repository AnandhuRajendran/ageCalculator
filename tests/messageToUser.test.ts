import { messageToUser } from "../ageCalculator";

describe("messageToUser", () => {
  const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  const today = new Date();
  const yearNow = today.getFullYear();
  const monthNow = today.getMonth() + 1;
  const dayNow = today.getDate();

  afterEach(() => logSpy.mockClear());
  afterAll(() => logSpy.mockRestore());

  test("detects future date", () => {
    messageToUser(`${yearNow + 1}/01/01`, 0);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("You are not born yet!"));
  });

  test("detects leap year birthday", () => {
    messageToUser("2000/02/29", 24);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Born on Feb 29"));
  });

  test("detects age >= 100", () => {
    messageToUser(`${yearNow - 100}/01/01`, 100);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Superhuman level reached"));
  });

  test("detects birthday today", () => {
    messageToUser(`${yearNow - 30}/${monthNow}/${dayNow}`, 30);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Happy Birthday!"));
  });

  test("detects born today (age 0)", () => {
    messageToUser(`${yearNow}/${monthNow}/${dayNow}`, 0);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Are you sure you are born today?"));
  });

  test("shows default message when no special case applies", () => {
    const pastMonth = monthNow === 12 ? 1 : monthNow + 1;
    messageToUser(`${yearNow - 25}/${pastMonth}/${dayNow}`, 25);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Keep enjoying your life"));
  });
});