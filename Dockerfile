# Imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el resto del código al contenedor
COPY . .

# Expone el puerto (el mismo que usas en tu app)
EXPOSE 3000

# Comando para ejecutar tu app
CMD ["npm", "start"]
