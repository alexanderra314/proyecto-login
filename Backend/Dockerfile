# Usamos la imagen oficial de Node.js
FROM node:16

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos el archivo package.json y package-lock.json al contenedor
COPY backend/package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el código fuente del backend al contenedor
COPY backend/ .

# Exponemos el puerto 3000 para que el backend sea accesible
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
