import { Router } from "express";
import { generateMockUsers, UserModel } from "../models/User.js";
import { PetModel } from "../models/Pet.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Mock API funcionando correctamente");
});

router.get("/mockingpets", (req, res) => {
    res.json({ message: "Aquí se generarán mascotas falsas en el futuro" });
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
        for (let i = 0; i < pets; i++) {
            generatedPets.push({
                name: `Pet ${i + 1}`,
                type: "Dog"
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
