import { Router } from "express";
import { UserModel } from "../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener usuarios", 
      error: error.message 
    });
  }
});

export default router;
