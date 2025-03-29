  # Etapa de construcción
  FROM node:14-alpine as build

  WORKDIR /app

  COPY package*.json ./

  RUN npm install

  COPY . .

  RUN npm run build

  # Etapa de producción
  FROM node:14-alpine

  WORKDIR /app

  COPY --from=build /app .

  EXPOSE 3000

  CMD ["node", "app.js"]
