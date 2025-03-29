import { Router } from "express";
import { generateMockUsers, UserModel } from "../models/User.js";
import { PetModel } from "../models/Pet.js";
import { faker } from "@faker-js/faker";

const router = Router();

router.get("/", (req, res) => {
  res.send("Mock API funcionando correctamente");
});

router.get("/mockingpets", (req, res) => {
  const petTypes = ["Dog", "Cat"];
  const pets = [];
  for (let i = 0; i < 10; i++) {
    const randomType = petTypes[Math.floor(Math.random() * petTypes.length)];
    const petName = faker.name.firstName();
    pets.push({ name: petName, type: randomType });
  }
  res.json(pets);
});

router.get("/mockingusers", (req, res) => {
  const users = generateMockUsers(50);
  res.json(users);
});

router.post("/generateData", async (req, res) => {
  const { users, pets } = req.body;
  
  if (!users || !pets) {
    return res.status(400).json({ message: "Faltan los parámetros 'users' o 'pets'" });
  }

  try {
    const generatedUsers = generateMockUsers(users);
    await UserModel.insertMany(generatedUsers);

    const generatedPets = [];
    const petTypes = ["Dog", "Cat"];
    
    for (let i = 0; i < pets; i++) {
      const randomType = petTypes[Math.floor(Math.random() * petTypes.length)];
      const petName = faker.name.firstName();
      
      generatedPets.push({
        name: petName,
        type: randomType
      });
    }
    await PetModel.insertMany(generatedPets);

    res.status(201).json({
      message: "Datos generados correctamente",
      data: {
        usersCreated: generatedUsers.length,
        petsCreated: generatedPets.length,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Hubo un error al generar los datos",
      error: error.message,
    });
  }
});

export default router;
