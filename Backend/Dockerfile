# Usa una imagen base de Node.js
FROM node:18
# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copia los archivos necesarios desde la carpeta Backend
COPY ./Backend/package*.json ./
RUN npm install
COPY ./Backend .
# Expone el puerto que usa tu servidor
EXPOSE 3000
# Comando para iniciar el servidor
CMD ["npm", "start"]