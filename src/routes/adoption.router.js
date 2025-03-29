import { Router } from "express";
import { AdoptionModel } from "../models/Adoption.js";  // Asegúrate de tener este modelo
import { UserModel } from "../models/User.js";  // Si es necesario
import { PetModel } from "../models/Pet.js";  // Si es necesario

const router = Router();

// Ruta para obtener todas las adopciones
router.get("/", async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find();
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las adopciones", error });
  }
});

// Ruta para crear una adopción
router.post("/", async (req, res) => {
  const { user, pet, status } = req.body;

  if (!user || !pet || !status) {
    return res.status(400).json({ message: "Faltan datos para la adopción" });
  }

  try {
    const newAdoption = new AdoptionModel({ user, pet, status });
    await newAdoption.save();
    res.status(201).json(newAdoption);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la adopción", error });
  }
});

// Ruta para actualizar el estado de una adopción
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Falta el estado de la adopción" });
  }

  try {
    const updatedAdoption = await AdoptionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedAdoption) {
      return res.status(404).json({ message: "Adopción no encontrada" });
    }
    res.status(200).json(updatedAdoption);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la adopción", error });
  }
});

// Ruta para eliminar una adopción
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAdoption = await AdoptionModel.findByIdAndDelete(id);
    if (!deletedAdoption) {
      return res.status(404).json({ message: "Adopción no encontrada" });
    }
    res.status(200).json({ message: "Adopción eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la adopción", error });
  }
});

export default router;
