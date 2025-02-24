import bcrypt from "bcrypt";

// Función para generar 'count' usuarios mock
export default function generateMockUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    // Asignar rol aleatorio: "user" o "admin"
    const role = Math.random() < 0.5 ? "user" : "admin";
    // Encriptar la contraseña "coder123"
    const hashedPassword = bcrypt.hashSync("coder123", 10);
    
    // Crear el objeto usuario (simulando el formato de MongoDB)
    const user = {
      // Puedes agregar un _id único si lo deseas, por ejemplo usando Date.now() o crypto.randomUUID() (si está disponible)
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
