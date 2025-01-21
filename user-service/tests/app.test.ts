describe("App Test cases", () => {
  it("should throw an error", () => {
    expect(() => {
      throw new Error("Something failed");
    }).toThrow();
  });
});
