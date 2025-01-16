import request from "supertest";
import app from "../src/server";
import mongoose from "mongoose";

describe("Server Test Cases", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Should throw an error", () => {
    expect(() => {
      throw new Error("Something failed"); // Fixed typo here
    }).toThrow("Something failed"); // Check that the error message is correct
  });

  it("Should get status 200 from server root endpoint", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
