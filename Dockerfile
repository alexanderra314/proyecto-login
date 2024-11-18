# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos necesarios desde la raíz del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el contenido de la carpeta Backend al contenedor
COPY ./Backend ./Backend

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "Backend/server.js"]
