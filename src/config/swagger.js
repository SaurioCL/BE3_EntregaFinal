import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Adopciones",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
    },
  },
  apis: ["../src/routes/*.js"], // Archivos donde están las rutas a documentar
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
