import request from "supertest";
import app from "../src";
import { connectMongo } from "../src/config/mongo";

jest.mock("../src/config/mongo", () => ({
  connectMongo: jest.fn(),
}));

describe("Server Test Cases", () => {
  beforeEach(() => jest.clearAllMocks());

  it("Should throw an error", () => {
    expect(() => {
      throw new Error("Something failed");
    }).toThrow("Something failed"); // Check that the error message is correct
  });

  it("Should get status 200 from server root endpoint", async () => {
    (connectMongo as jest.Mock).mockResolvedValueOnce(undefined);
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
