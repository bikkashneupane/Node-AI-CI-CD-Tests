import request from "supertest";
import app from "../../src/index";

describe("Index Test Cases", () => {
  it("Should throw an error", () => {
    expect(() => {
      throw new Error("Something failed");
    }).toThrow("Something failed");
  });
});
