import bcrypt from "bcrypt";

export default function generateMockUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const role = Math.random() < 0.5 ? "user" : "admin";
    const hashedPassword = bcrypt.hashSync("coder123", 10);
    
    const user = {
      _id: crypto.randomUUID ? crypto.randomUUID() : i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: hashedPassword,
      role,
      pets: []
    };
    users.push(user);
  }
  return users;
}
