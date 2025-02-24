import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const app = express();

app.use(express.json());
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

mongoose.connect("mongodb://localhost:27017/mockDB")
    .then(() => {
        console.log("Conexión a MongoDB exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
