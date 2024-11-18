//require('dotenv').config();
require('dotenv').config({ path: './Backend/.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const path = require('path');


const app = express();



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});
//mongoose.connect(process.env.MONGO_URI)

app.use(cors({
  origin: 'https://proyecto-login-alexanderra314.netlify.app', // Asegúrate de que esta URL sea la correcta
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Asegura que estos encabezados estén permitidos
  credentials: true, // Permite el envío de cookies si es necesario
}));
app.use(bodyParser.json());
//app.use(express.static('public'));
app.use('/api', authRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

