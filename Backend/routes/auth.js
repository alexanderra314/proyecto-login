// api/auth.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa el modelo de usuario
const express = require('express');
const router = express.Router(); // Crea un enrutador de express

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return res.json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        return res.status(400).json({ error: 'Error al registrar usuario' });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login exitoso', token });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
