import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'supersecretkey123';
const USERS_FILE = join(__dirname, 'users.json');

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

        // Leer usuarios existentes
        let users = [];
        try {
            const data = await fs.readFile(USERS_FILE, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe o está vacío, continuamos con el array vacío
        }

        // Comprobar si el usuario ya existe
        const userExists = users.find(u => u.Email === Email || u.Nombre === Nombre);
        if (userExists) {
            return res.status(400).json({ message: 'El correo o el nombre de usuario ya está registrado.' });
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            Nombre,
            Apellido,
            Edad,
            Email,
            password: hashedPassword
        };

        // Guardar
        users.push(newUser);
        await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

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

        // Leer usuarios
        let users = [];
        try {
            const data = await fs.readFile(USERS_FILE, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            return res.status(500).json({ message: 'Error al leer la base de datos de usuarios.' });
        }

        // Buscar usuario (por nombre o email)
        const user = users.find(u => u.Nombre === Nombre || u.Email === Nombre);
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
            { id: user.id, Nombre: user.Nombre },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso.',
            token,
            user: {
                id: user.id,
                Nombre: user.Nombre,
                Email: user.Email
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
