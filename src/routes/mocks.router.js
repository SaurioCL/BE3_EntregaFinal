import { Router } from "express";
import { generateMockUsers, UserModel } from "../models/User.js"; // Importamos el modelo y la función
import { PetModel } from "../models/Pet.js"; // Importamos el modelo de mascotas

const router = Router();

router.get("/", (req, res) => {
    res.send("Mock API funcionando correctamente");
});

router.get("/mockingpets", (req, res) => {
    res.json({ message: "Aquí se generarán mascotas falsas en el futuro" });
});

router.get("/mockingusers", (req, res) => {
    const users = generateMockUsers(50);  // Generamos 50 usuarios
    res.json(users);  // Devolvemos los usuarios generados como respuesta JSON
});

router.post("/generateData", async (req, res) => {
    const { users, pets } = req.body;
    
    if (!users || !pets) {
        return res.status(400).json({ message: "Faltan los parámetros 'users' o 'pets'" });
    }

    try {
        // Generar usuarios
        const generatedUsers = generateMockUsers(users);
        await UserModel.insertMany(generatedUsers);

        // Generar mascotas
        const generatedPets = [];
        for (let i = 0; i < pets; i++) {
            generatedPets.push({
                name: `Pet ${i + 1}`,
                type: "Dog" // O el tipo que prefieras
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
