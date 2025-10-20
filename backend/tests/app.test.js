const request = require("supertest");
const express = require("express");

const app = express();
app.get("/", (req, res) => res.status(200).send("Servidor OK"));

describe("Teste básico da API", () => {
  it("Deve responder na rota raiz com status 200", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Servidor OK");
  });
});
