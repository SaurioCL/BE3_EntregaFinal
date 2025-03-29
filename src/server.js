import app from "./app.js";
import mongoose from "mongoose";

const PORT = 3000;
const MONGO_URI = "mongodb://host.docker.internal:27017/mockDB";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Conexión a MongoDB exitosa");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });
