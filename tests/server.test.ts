describe("Server Test Cases", () => {
  it("Should log out hello", () => {
    console.log("hello");
    expect(() => {
      throw new Error("Somethong failed");
    }).toThrow();
  });
});
