//require('dotenv').config();
require('dotenv').config({ path: './Backend/.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});
//mongoose.connect(process.env.MONGO_URI)

app.use(cors({
  origin: 'https://proyecto-login-alexanderra314.netlify.app', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(bodyParser.json());
//app.use(express.static('public'));
app.use('/api', authRoutes);

// Servir archivos estáticos desde la carpeta 'public'
// Servir archivos estáticos desde la carpeta 'views' (donde están css y js)
app.use('/views/css', express.static(path.join(__dirname, 'views', 'css')));
app.use('/views/js', express.static(path.join(__dirname, 'views', 'js')));

// Servir el archivo index.html desde la carpeta 'views'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

