# F1 2025 🏎️

Sitio web dedicado a la temporada 2025 de Fórmula 1, con landing informativa,
sistema de autenticación y backend propio en Node.js.

## Demo

- Sitio: agregar aquí el link de despliegue (Render / GitHub Pages)

## Funcionalidades

- Home con hero section y efecto parallax.
- Navegación e información de equipos y pilotos.
- Sección de testimonios.
- Registro e inicio de sesión de usuarios.
- Autenticación con JWT y contraseñas cifradas con bcrypt.
- Diseño responsive, adaptado a distintos tamaños de pantalla.

## Stack Tecnológico

**Frontend:** HTML5, CSS3, JavaScript (DOM, fetch, diseño responsive).

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, dotenv,
cookie-parser.

**Dev tools:** Nodemon.

## Estructura del proyecto

```text
f1/
├── app/          # Servidor Express (index.js) y modelos de datos
├── css/          # Estilos (home, login, header, nav, auth)
├── js/           # Lógica de cliente (auth, header, home, login, register, parallax, testimonios)
├── img/ fonts/   # Recursos visuales y tipografías
├── index.html    # Página principal
├── login.html    # Inicio de sesión
└── register.html # Registro de usuario
```

## Instalación y ejecución

```bash
git clone https://github.com/AdanSM/f1.git
cd f1
npm install
```

Crea un archivo `.env` con las variables necesarias (conexión a MongoDB, secreto
de JWT, etc.) y luego levanta el servidor:

```bash
npm run dev
```

## Despliegue

Incluye `render.yaml` para desplegar el backend en Render.

## Autor

Adán Santos Mena — [GitHub](https://github.com/AdanSM)
