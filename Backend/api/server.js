require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error de conexión:', error));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

