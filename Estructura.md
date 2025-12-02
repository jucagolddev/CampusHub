PROYECTO-EUSA/
├── backend/ # 🟢 BACKEND (API REST / MVC)
│ ├── src/
│ │ ├── config/
│ │ │ ├── db.config.ts # Configuración de conexión (MongoDB/MySQL)
│ │ │ └── env.config.ts # Lector de variables de entorno (PORT, SECRET_KEY)
│ │ │
│ │ ├── controllers/ # (Lógica de Negocio)
│ │ │ ├── auth.controller.ts # register(), login()
│ │ │ ├── project.controller.ts# createProject(), getProjects(), deleteProject()
│ │ │ └── user.controller.ts # getUserProfile()
│ │ │
│ │ ├── middlewares/ # (Intermediarios)
│ │ │ ├── auth.middleware.ts # Verifica si el JWT es válido
│ │ │ ├── upload.middleware.ts # Configuración de Multer (para subir imágenes)
│ │ │ └── error.middleware.ts # Manejador global de errores
│ │ │
│ │ ├── models/ # (Esquemas de Base de Datos)
│ │ │ ├── User.ts # Schema de Usuario
│ │ │ └── Project.ts # Schema de Proyecto
│ │ │
│ │ ├── routes/ # (Rutas de API)
│ │ │ ├── auth.routes.ts # POST /login, POST /register
│ │ │ ├── project.routes.ts # GET /, POST /upload, DELETE /:id
│ │ │ └── index.routes.ts # Agrupador de rutas principales
│ │ │
│ │ ├── utils/ # (Herramientas Auxiliares)
│ │ │ ├── jwt.util.ts # Generador de Tokens
│ │ │ └── validators.util.ts # Validaciones de email, contraseña, etc.
│ │ │
│ │ └── server.ts # 🏁 Punto de entrada (Arranca el servidor)
│ │
│ ├── .env # Variables secretas (NO subir a GitHub)
│ ├── package.json # Dependencias (express, mongoose, etc.)
│ └── tsconfig.json # Configuración de TypeScript
│
└── frontend/ # 🔵 FRONTEND (Angular 16+ / MVVM)
├── src/
│ ├── app/
│ │ │
│ │ ├── core/ # 🧠 EL NÚCLEO (Singletons)
│ │ │ ├── auth/
│ │ │ │ └── auth.service.ts # Gestión de sesión (Login/Logout)
│ │ │ ├── guards/
│ │ │ │ ├── auth.guard.ts # Bloquea usuarios no logueados
│ │ │ │ └── collaborator.guard.ts # Bloquea usuarios que no son colaboradores
│ │ │ ├── interceptors/
│ │ │ │ ├── jwt.interceptor.ts # Añade el Token a las peticiones
│ │ │ │ └── error.interceptor.ts # Captura errores HTTP globales
│ │ │ ├── models/
│ │ │ │ ├── user.model.ts # Interface Usuario
│ │ │ │ ├── project.model.ts # Interface Proyecto
│ │ │ │ └── api-response.model.ts # Interface respuesta genérica del back
│ │ │ └── services/
│ │ │ ├── api.service.ts # Cliente HTTP Base (Wrapper)
│ │ │ ├── storage.service.ts # Gestión limpia de LocalStorage
│ │ │ └── ui.service.ts # Control de Spinners y Alertas
│ │ │
│ │ ├── layout/ # 🖼️ ESTRUCTURAS MAESTRAS
│ │ │ ├── main-layout/ # (Para usuarios públicos)
│ │ │ │ ├── main-layout.component.ts
│ │ │ │ ├── main-layout.component.html
│ │ │ │ ├── main-layout.component.scss
│ │ │ │ └── header/ # Componente Navbar pública
│ │ │ │ ├── header.component.ts
│ │ │ │ ├── header.component.html
│ │ │ │ └── header.component.scss
│ │ │ └── admin-layout/ # (Para colaboradores)
│ │ │ ├── admin-layout.component.ts
│ │ │ ├── admin-layout.component.html
│ │ │ ├── admin-layout.component.scss
│ │ │ └── sidebar/ # Componente Menú lateral gestión
│ │ │ ├── sidebar.component.ts
│ │ │ ├── sidebar.component.html
│ │ │ └── sidebar.component.scss
│ │ │
│ │ ├── shared/ # ♻️ REUTILIZABLES
│ │ │ ├── components/
│ │ │ │ ├── project-card/
│ │ │ │ │ ├── project-card.component.ts
│ │ │ │ │ ├── project-card.component.html
│ │ │ │ │ └── project-card.component.scss
│ │ │ │ ├── loader/
│ │ │ │ │ ├── loader.component.ts
│ │ │ │ │ ├── loader.component.html
│ │ │ │ │ └── loader.component.scss
│ │ │ │ └── alert-msg/
│ │ │ │ ├── alert-msg.component.ts
│ │ │ │ ├── alert-msg.component.html
│ │ │ │ └── alert-msg.component.scss
│ │ │ ├── directives/
│ │ │ │ └── img-fallback.directive.ts
│ │ │ └── pipes/
│ │ │ └── truncate.pipe.ts
│ │ │
│ │ ├── features/ # 🚀 PÁGINAS (Vistas)
│ │ │ ├── home/ # (Landing Page)
│ │ │ │ ├── home.component.ts
│ │ │ │ ├── home.component.html
│ │ │ │ └── home.component.scss
│ │ │ ├── auth/ # (Autenticación)
│ │ │ │ ├── login/
│ │ │ │ │ ├── login.component.ts
│ │ │ │ │ ├── login.component.html
│ │ │ │ │ └── login.component.scss
│ │ │ │ └── register/
│ │ │ │ ├── register.component.ts
│ │ │ │ ├── register.component.html
│ │ │ │ └── register.component.scss
│ │ │ └── projects/ # (Gestión de Proyectos)
│ │ │ ├── project-list/ # Catálogo público
│ │ │ │ ├── project-list.component.ts
│ │ │ │ ├── project-list.component.html
│ │ │ │ └── project-list.component.scss
│ │ │ ├── project-detail/ # Ver un proyecto
│ │ │ │ ├── project-detail.component.ts
│ │ │ │ ├── project-detail.component.html
│ │ │ │ └── project-detail.component.scss
│ │ │ └── project-upload/ # Subida (Solo colaboradores)
│ │ │ ├── project-upload.component.ts
│ │ │ ├── project-upload.component.html
│ │ │ └── project-upload.component.scss
│ │ │
│ │ ├── app.routes.ts # Definición de rutas y Lazy Loading
│ │ ├── app.config.ts # Configuración Global (Providers)
│ │ ├── app.component.ts # Componente Raíz
│ │ ├── app.component.html
│ │ └── app.component.scss
│ │
│ ├── assets/
│ │ ├── images/ # Logos, Placeholders
│ │ └── icons/
│ │
│ ├── environments/
│ │ ├── environment.ts # Configuración Desarrollo (localhost)
│ │ └── environment.prod.ts # Configuración Producción (servidor real)
│ │
│ ├── index.html # HTML base
│ ├── main.ts # Punto de entrada Angular
│ └── styles.scss # Estilos globales (Reset, fuentes)
│
├── angular.json # Configuración del CLI de Angular
├── package.json # Dependencias Frontend
└── tsconfig.json # Configuración TypeScript Frontend

### 🟢 BACKEND (Servidor)

**Ubicación:** `/backend`
**Patrón:** MVC (Modelo-Vista-Controlador)
**Responsabilidad:** Gestionar datos, seguridad y reglas de negocio. No contiene interfaz visual.

```text
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 config           # Configuración de entorno (DB, Puertos, Secretos).
│   │   ├── 📁 controllers      # (CONTROLADOR) Reciben peticiones, ejecutan lógica y responden.
│   │   ├── 📁 middelwares      # (SEGURIDAD) Verifican permisos antes de llegar al controlador.
│   │   ├── 📁 models           # (MODELO) Esquemas de BBDD (Definición de Usuario y Proyecto).
│   │   └── 📁 routes           # (RUTAS) Mapa de endpoints de la API (ej: /api/login).

🔵 FRONTEND (Cliente)
Ubicación: /frontend Framework: Angular 16+ Patrón: MVVM (Model-View-ViewModel) con Arquitectura Modular.

El frontend se organiza en capas funcionales para asegurar que el código sea limpio y reutilizable.

1. 🧠 CORE (src/app/core)
El núcleo de la aplicación. Contiene servicios Singletons (instancia única) y lógica de seguridad. Se carga una sola vez al iniciar la app.

guards/ (Guardianes de Ruta):

auth.guard.ts: Protege rutas privadas. Si no estás logueado, te redirige al Login.

role.guard.ts: Protege rutas sensibles (como "Subir Proyecto"). Solo permite el paso si el usuario tiene rol de Colaborador.

interceptors/ (Intermediarios HTTP):

token.interceptor.ts: Agrega automáticamente el Token JWT a cada petición que sale hacia el backend.

error.interceptor.ts: Captura errores globales (401, 500) y muestra alertas sin repetir código en los componentes.

models/ (Interfaces de Datos):

user.ts y project.ts: Definen la estructura estricta de los datos para que Frontend y Backend "hablen el mismo idioma".

services/ (Gestión de Datos):

api.service.ts: Cliente HTTP centralizado.

auth.service.ts: Gestiona Login, Registro y estado de la sesión.

storage.service.ts: Envoltorio seguro para usar localStorage.

ui.service.ts: Controla el estado visual global (Spinners, Modales).

2. 🚀 FEATURES (src/app/features)
Aquí residen las Vistas Inteligentes (Smart Components). Cada carpeta representa una página funcional.

auth/: Módulo de acceso.

login: Pantalla de inicio de sesión.

register: Pantalla de registro de nuevos usuarios.

home/: Página de aterrizaje (Landing Page).

projects/: Funcionalidad principal de la web.

project-list: Catálogo público. Muestra todos los proyectos disponibles.

project-detail: Vista completa de un proyecto individual.

project-upload: (Protegido) Formulario exclusivo para colaboradores donde se suben imágenes y descripciones de proyectos.

3. 🖼️ LAYOUT (src/app/layout)
Define los marcos estructurales que envuelven a las páginas, diferenciando la experiencia según el usuario.

main-layout/: Diseño para visitantes y alumnos.

Utiliza header (Navbar pública) y footer.

admin-layout/: Diseño para el panel de gestión (Colaboradores).

Utiliza sidebar para herramientas de administración y gestión de subidas.

4. ♻️ SHARED (src/app/shared)
Biblioteca de componentes UI reutilizables ("Dumb Components") que no tienen lógica de negocio compleja.

components/:

project-card: Tarjeta visual que resume un proyecto. Se usa tanto en la Home como en las listas.

loading-spinner: Indicador visual de carga para esperas asíncronas.

alert-msg: Componente para notificaciones flotantes (Toast) de éxito o error.

directives/:

img-fallback.directive.ts: Detecta si una imagen está rota y la sustituye automáticamente por un placeholder de EUSA.

pipes/:

truncate.pipe.ts: Corta textos largos (descripciones) añadiendo "..." al final para mantener el diseño limpio.

5. ⚙️ CONFIGURACIÓN GLOBAL
environments/:

environment.ts: Configuración para desarrollo local (localhost).

environment.prod.ts: Configuración para producción (servidor real).

assets/: Recursos estáticos (imágenes, iconos, fuentes).

app-routing.module.ts: Define el mapa de navegación y la carga perezosa (Lazy Loading) de los módulos.

```

🛠️ Cómo iniciar el proyecto
Backend
Bash

cd backend
npm install
npm start
Frontend
Bash

cd frontend
npm install
ng serve