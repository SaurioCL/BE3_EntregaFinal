import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Pet = mongoose.model("Pet", petSchema);

export { Pet as PetModel };
