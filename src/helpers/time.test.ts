import { fmtMSS } from "./time";
describe("time helper", () => {
  it("should return minutes and seconds from seconds", () => {
    expect(fmtMSS(90)).toBe("1:30");
  });
  it("should return seconds if less then 60", () => {
    expect(fmtMSS(59)).toBe("0:59");
  });
});
