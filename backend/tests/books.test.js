import request from "supertest";
import app from "../server.js";

describe("GET /books", () => {
  it("deve retornar status 200 e um array de livros", async () => {
    const res = await request(app).get("/books");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
