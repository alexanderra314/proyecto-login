require('dotenv').config({ path: './Backend/.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
}).then(() => {
  console.log('Conexión a la base de datos establecida.');
}).catch((err) => {
  console.error('Error al conectar a la base de datos:', err);
});

// Configuración de CORS para permitir el frontend en Netlify
app.use(cors({
  origin: 'https://proyecto-login-alexanderra314.netlify.app', // Asegúrate de que esta URL sea la correcta
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Asegura que estos encabezados estén permitidos
  credentials: true, // Permite el envío de cookies si es necesario
}));

// Middleware para procesar JSON
app.use(bodyParser.json());

// Manejo de solicitudes OPTIONS (preflight)
app.options('*', cors()); // Esto asegura que todas las rutas respondan adecuadamente a las solicitudes OPTIONS

// Rutas de autenticación
app.use('/api', authRoutes);


// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
