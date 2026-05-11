import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Modelos
import User from './models/User.js';

// Configurar variables de entorno
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey123';
const MONGO_URI = process.env.MONGO_URI; 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirviendo archivos estáticos desde la raíz del proyecto (una carpeta arriba de 'app')
app.use(express.static(join(__dirname, '..')));

// Endpoint de Registro
app.post('/api/register', async (req, res) => {
    try {
        const { Nombre, Apellido, Edad, Email, password } = req.body;

        if (!Nombre || !Apellido || !Edad || !Email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
        }

        // Comprobar si el usuario ya existe en MongoDB
        const userExists = await User.findOne({ 
            $or: [{ Email: Email }, { Nombre: Nombre }] 
        });

        if (userExists) {
            return res.status(400).json({ message: 'El correo o el nombre de usuario ya está registrado.' });
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            Nombre,
            Apellido,
            Edad,
            Email,
            password: hashedPassword
        });

        // Guardar en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Endpoint de Inicio de Sesión
app.post('/api/login', async (req, res) => {
    try {
        const { Nombre, password } = req.body;

        if (!Nombre || !password) {
            return res.status(400).json({ message: 'Nombre y contraseña son requeridos.' });
        }

        // Buscar usuario (por nombre o email)
        const user = await User.findOne({ 
            $or: [{ Nombre: Nombre }, { Email: Nombre }] 
        });

        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, Nombre: user.Nombre },
            SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id: user._id,
                Nombre: user.Nombre,
                Email: user.Email
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Conectar a MongoDB y luego iniciar el servidor
if (!MONGO_URI) {
    console.error('ERROR: No se ha configurado MONGO_URI en las variables de entorno (.env).');
    console.log('El servidor intentará iniciarse de todas formas para servir la página estática, pero el registro fallará.');
    
    app.listen(PORT, () => {
        console.log(`Servidor corriendo sin base de datos en http://localhost:${PORT}`);
    });
} else {
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log('Conectado exitosamente a MongoDB');
            app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
            });
        })
        .catch((error) => {
            console.error('Error al conectar a MongoDB:', error);
            process.exit(1);
        });
}
