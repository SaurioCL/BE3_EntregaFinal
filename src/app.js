import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";

import { setupSwagger } from "./config/swagger.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine("hbs", engine({ 
  extname: ".hbs",
  defaultLayout: false 
  }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

app.get("/", (req, res) => {
  res.render("home");
});

setupSwagger(app);

export default app;
