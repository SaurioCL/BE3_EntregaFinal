import { AdoptionModel } from "../models/Adoption.js";

const adoptionsController = {
  // Obtener todas las adopciones
  getAllAdoptions: async (req, res) => {
    try {
      const adoptions = await AdoptionModel.find().populate("user pet");
      res.status(200).json(adoptions);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener adopciones", error });
    }
  },

  // Obtener una adopción por ID
  getAdoption: async (req, res) => {
    const { aid } = req.params;
    try {
      const adoption = await AdoptionModel.findById(aid).populate("user pet");
      if (!adoption) {
        return res.status(404).json({ message: "Adopción no encontrada" });
      }
      res.status(200).json(adoption);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la adopción", error });
    }
  },

  // Crear una adopción
  createAdoption: async (req, res) => {
    const { uid, pid } = req.params;

    try {
      const newAdoption = new AdoptionModel({
        user: uid,
        pet: pid,
        status: "pending",
      });

      const savedAdoption = await newAdoption.save();
      res.status(201).json(savedAdoption);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la adopción", error });
    }
  },
};

export default adoptionsController;
