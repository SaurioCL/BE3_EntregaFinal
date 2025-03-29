import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Retorna una lista de usuarios registrados en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Devuelve un usuario específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
});

export default router;
