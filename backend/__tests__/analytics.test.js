const request = require("supertest");

// Mock BigQuery
jest.mock("../src/services/bigquery", () => ({
  runQuery: jest.fn().mockResolvedValue([
    { year: 2020, avg_turnout: 71.2 },
    { year: 2024, avg_turnout: 74.8 },
  ]),
}));

const app = require("../src/app");

describe("GET /api/analytics", () => {
  it("should return 200 with turnoutTrends and regionData", async () => {
    const res = await request(app).get("/api/analytics");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("turnoutTrends");
    expect(res.body).toHaveProperty("regionData");
    expect(Array.isArray(res.body.turnoutTrends)).toBe(true);
  });
});
