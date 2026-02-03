# CampusHub - Backend API

Bienvenido a la documentación del servidor **CampusHub**. Este backend proporciona una API RESTful robusta y segura para gestionar toda la lógica de negocio de la plataforma universitaria.

---

## 🛠 Stack Tecnológico

- **Runtime**: Node.js.
- **Framework Web**: Express.js.
- **Lenguaje**: TypeScript (compilado a JavaScript).
- **Base de Datos**: MySQL (gestión relacional).
- **Autenticación**: JWT (JSON Web Tokens).

---

## ⚙️ Instalación y Configuración

### 1. Prerrequisitos

Asegúrese de estar en el directorio `backend/`:

```bash
cd backend
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configuración de Variables de Entorno

Cree un archivo `.env` en la raíz de la carpeta `backend` basándose en el siguiente ejemplo. **IMPORTANTE**: Nunca suba el archivo real con claves secretas al repositorio.

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=campushub_db
JWT_SECRET=tu_clave_super_secreta_aqui
```

---

## ▶️ Ejecución del Servidor

### Modo Desarrollo

Para iniciar el servidor con reinicio automático (usando `nodemon` o similar):

```bash
npm run dev
```

### Modo Producción

Para compilar el código TypeScript y ejecutar la versión optimizada:

```bash
npm run build
npm start
```

El servidor escuchará en el puerto definido en `.env` (por defecto 3000).

---

## 🔌 API Endpoints (Resumen)

| Método | Endpoint             | Descripción                    | Autenticación |
| ------ | -------------------- | ------------------------------ | ------------- |
| POST   | `/api/auth/login`    | Iniciar sesión y obtener token | No            |
| POST   | `/api/auth/register` | Registrar nuevo usuario        | No            |
| GET    | `/api/users`         | Listar todos los usuarios      | Sí (Admin)    |
| GET    | `/api/courses`       | Obtener cursos disponibles     | Sí            |

_(Para una documentación completa, referirse a la colección de Postman o Swagger del equipo)._

---

## 📂 Estructura del Código Backend

```plaintext
src/
├── config/         # Configuración de DB y entorno
├── controllers/    # Lógica de los endpoints (request/response)
├── models/         # Esquemas de Mongoose (Datos)
├── routes/         # Definición de rutas de la API
├── middlewares/    # Funciones intermedias (Auth, Validación)
├── utils/          # Herramientas auxiliares y helpers
├── app.ts          # Configuración de Express
└── server.ts       # Punto de entrada del servidor
```

---

**CampusHub Backend Team**
