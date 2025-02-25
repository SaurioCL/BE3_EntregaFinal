import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

const User = mongoose.model("User", userSchema);

export function generateMockUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const user = {
      password: bcrypt.hashSync("coder123", 10),
      role: Math.random() < 0.5 ? "user" : "admin",
      pets: [],
    };
    users.push(user);
  }
  return users;
}

export { User as UserModel };
