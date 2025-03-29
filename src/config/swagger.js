import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuarios",
      version: "1.0.0",
      description: "Documentación de la API de Usuarios con Swagger",
    },
  },
  apis: ["./src/routes/users.router.js"], // Archivos donde están las rutas a documentar
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
