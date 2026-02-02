# CampusHub 🎓

CampusHub es una plataforma integral diseñada para la gestión de proyectos académicos y la colaboración entre miembros de la comunidad educativa (Alumnos, Profesores y Administradores).

---

## 🚀 Características Principales

- **Registro Dinámico**: Sistema de alta de usuarios con selección de roles académicos específicos.
- **Gestión Administrativa**: Interfaz dedicada para el registro y mantenimiento de centros educativos.
- **Vinculación Académica**: Cada usuario se asocia a un Centro y un Título, permitiendo una mejor organización.
- **Catálogo de Proyectos**: Galería interactiva con detalles de proyectos desarrollados por la comunidad.
- **Subida de Proyectos**: Los alumnos pueden compartir sus creaciones con el mundo.
- **Diseño Moderno**: Interfaz premium con arquitectura modular y enfocada en UX.

---

## 🛠️ Stack Tecnológico

El proyecto se divide en dos grandes bloques utilizando tecnologías de última generación:

### Backend (Node.js API)

- **Node.js**: v20.x
- **Express**: v4.18.2 - Framework web minimalista.
- **TypeScript**: v5.3.3 - Para un código tipado y seguro.
- **MySQL**: v3.9.1 (Driver `mysql2`) - Base de datos relacional.
- **Autenticación**: `bcrypt` (v5.1.1) para hashing y `uuid` (v9.0.1) para gestión de tokens.
- **CORS**: v2.8.5 - Configurado para interoperabilidad con el frontend.

### Frontend (Angular Web App)

- **Angular**: v16.2.0 - Framework principal basado en componentes.
- **TypeScript**: v5.1.3
- **RxJS**: v7.8.0 - Programación reactiva para la gestión de datos.
- **SCSS/CSS3**: Estilos modernos con variables y arquitectura modular.
- **Angular Router**: Gestión de navegación SPA.

---

## 📂 Estructura del Proyecto

A continuación se detalla la organización de archivos de **CampusHub**:

```text
CampusHub/
├── backend/                # API REST (Lógica de servidor)
│   ├── src/
│   │   ├── config/         # Configuración (Base de Datos)
│   │   ├── controllers/    # Lógica de negocio (Manejo de peticiones)
│   │   │   ├── userController.ts
│   │   │   └── masterDataController.ts
│   │   ├── models/         # Interacción con la base de datos (SQL)
│   │   ├── routes/         # Definición de Endpoints
│   │   │   ├── index.ts    # Hub central de rutas
│   │   │   ├── userRoutes.ts
│   │   │   └── masterDataRoutes.ts
│   │   ├── sql/            # Scripts de base de datos
│   │   │   └── install.sql # Script maestro de instalación
│   │   └── server.ts       # Punto de entrada de la aplicación
│   ├── .env                # Variables de entorno (Ignorado en git)
│   └── package.json        # Dependencias y scripts del backend
├── frontend/               # Aplicación Web (Interfaz de usuario)
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Servicios singleton, interfaces y guards
│   │   │   ├── features/   # Módulos de funcionalidad (Auth, Projects, Admin)
│   │   │   ├── shared/     # Componentes y pipes reutilizables
│   │   │   └── app.routes.ts # Configuración de rutas frontend
│   │   ├── assets/         # Imágenes, estilos globales y fuentes
│   │   └── index.html      # Página principal
│   └── angular.json        # Configuración de Angular CLI
├── README.md               # Documentación general
└── .gitignore              # Archivos ignorados por Git
```

---

## 📡 API Endpoints (Referencia)

La API está documentada para facilitar la integración. La ruta base es `http://localhost:3000/api`.

### Usuarios (`/users`)

- `POST /register`: Registra un nuevo usuario con datos académicos opcionales.
- `POST /login`: Autentica al usuario, devuelve JWT y roles.
- `GET /users`: Lista todos los usuarios con sus roles (Admin).

### Datos Maestros (`/`)

- `GET /roles`: Obtiene el catálogo de roles disponibles (Alumno, Profesor, Admin).
- `GET /centros`: Lista todos los centros educativos registrados.
- `GET /titulos`: Lista las titulaciones académicas.
- `POST /centros`: Permite dar de alta un nuevo centro (Acceso Administrativo).

### Proyectos (`/projects`)

- `GET /`: Recupera el catálogo de proyectos existentes.
- `GET /:id`: Detalle extendido de un proyecto específico.
- `POST /`: Publica un nuevo proyecto (Requiere autenticación).

---

## 📦 Instalación y Puesta en Marcha

### Requisitos Previos

- **Node.js**: v18 o superior.
- **MySQL**: Servidor activo (v8.0 sugerida o XAMPP).

### Paso 1: Base de Datos

Importa el script `backend/src/sql/install.sql` en tu cliente SQL favorito. Esto creará la base de datos `proyecto_integrado` con todas las tablas y datos iniciales.

### Paso 2: Backend

```bash
cd backend
npm install
npm run dev
```

### Paso 3: Frontend

```bash
cd frontend
npm install
ng serve
```

_Visita `http://localhost:4200` para empezar a usar la aplicación._

---
