import { Router } from "express";
import { PetModel } from "../models/Pet.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    // Obtener todas las mascotas de la colección
    const pets = await PetModel.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener mascotas", 
      error: error.message 
    });
  }
});

export default router;
