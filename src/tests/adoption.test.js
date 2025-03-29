import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

import { UserModel } from "../models/User.js";
import { PetModel } from "../models/Pet.js";
import { AdoptionModel } from "../models/Adoption.js";

let server;

beforeAll(async () => {
  server = app.listen(4000);
  await mongoose.connect("mongodb://localhost:27017/test_adoptions");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  server.close();
});

describe("Adoption Router", () => {
  let userId;
  let petId;

  beforeEach(async () => {
    await UserModel.deleteMany();
    await PetModel.deleteMany();
    await AdoptionModel.deleteMany();

    const user = await UserModel.create({
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      role: "user",
      pets: [],
    });

    const pet = await PetModel.create({
      name: "Firulais",
      type: "Dog",
    });

    userId = user._id;
    petId = pet._id;
  });

  it("POST /api/adoptions → debería crear una adopción", async () => {
    const response = await request(app)
      .post("/api/adoptions")
      .send({
        user: userId,
        pet: petId,
        status: "pending"
      });
  
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.status).toBe("pending");
  });

  it("GET /api/adoptions → debería obtener todas las adopciones", async () => {
    await AdoptionModel.create({ user: userId, pet: petId, status: "adopted" });

    const response = await request(app).get("/api/adoptions");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("GET /api/adoptions/:aid → debería obtener una adopción por ID", async () => {
    const adoption = await AdoptionModel.create({ user: userId, pet: petId, status: "adopted" });

    const response = await request(app).get(`/api/adoptions/${adoption._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", adoption._id.toString());
  });
});
