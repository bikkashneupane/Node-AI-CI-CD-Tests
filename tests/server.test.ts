describe("Server Test Cases", () => {
  it("Should throw an error", () => {
    expect(() => {
      throw new Error("Something failed"); // Fixed typo here
    }).toThrow("Something failed"); // Check that the error message is correct
  });
});
