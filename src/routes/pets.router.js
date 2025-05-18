import { Router } from "express";
import { PetModel } from "../models/Pet.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints para la gestión de mascotas
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 */
router.get("/", async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener mascotas",
      error: error.message,
    });
  }
});

export default router;