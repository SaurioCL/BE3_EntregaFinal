import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export default function generateMockUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const role = Math.random() < 0.5 ? "user" : "admin";
    const hashedPassword = bcrypt.hashSync("coder123", 10);
    
    const user = {
      name: `User ${i + 1}`,
      email: faker.internet.email(),
      password: hashedPassword,
      role,
      pets: []
    };
    users.push(user);
  }
  return users;
}
