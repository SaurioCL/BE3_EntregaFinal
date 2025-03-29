import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

export const PetModel = mongoose.model("Pet", petSchema);
