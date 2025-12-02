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
