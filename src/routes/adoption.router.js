import { Router } from "express";
import { AdoptionModel } from "../models/Adoption.js";
import { UserModel } from "../models/User.js";
import { PetModel } from "../models/Pet.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para la gestión de adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones
 */
router.get("/", async (req, res) => {
  try {
    const adoptions = await AdoptionModel.find();
    res.status(200).json(adoptions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las adopciones", error });
  }
});

/**
 * @swagger
 * /api/adoptions/{id}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: Adopción no encontrada
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const adoption = await AdoptionModel.findById(id);
    if (!adoption) {
      return res.status(404).json({ message: "Adopción no encontrada" });
    }
    res.status(200).json(adoption);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la adopción", error });
  }
});

/**
 * @swagger
 * /api/adoptions:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: ID del usuario
 *               pet:
 *                 type: string
 *                 description: ID de la mascota
 *               status:
 *                 type: string
 *                 enum: [pending, adopted, rejected]
 *     responses:
 *       201:
 *         description: Adopción creada
 *       400:
 *         description: Faltan datos
 */
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

/**
 * @swagger
 * /api/adoptions/{id}:
 *   put:
 *     summary: Actualizar el estado de una adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la adopción a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, adopted, rejected]
 *     responses:
 *       200:
 *         description: Adopción actualizada
 *       404:
 *         description: Adopción no encontrada
 */
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

/**
 * @swagger
 * /api/adoptions/{id}:
 *   delete:
 *     summary: Eliminar una adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la adopción a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción eliminada
 *       404:
 *         description: Adopción no encontrada
 */
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
