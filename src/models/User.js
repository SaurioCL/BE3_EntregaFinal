import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

const User = mongoose.model("User", userSchema);

export function generateMockUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const hashedPassword = bcrypt.hashSync("coder123", 10);
    const role = Math.random() < 0.5 ? "user" : "admin";
    const user = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role,
      pets: []
    };
    users.push(user);
  }
  return users;
}

export { User as UserModel };
