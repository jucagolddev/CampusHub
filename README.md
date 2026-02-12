# CampusHub: Ecosistema Digital de Colaboración Académica

![CampusHub Logo](./frontend/src/assets/images/LogoV2.png)

**CampusHub** es una plataforma Full Stack diseñada para centralizar, gestionar y proyectar el talento académico. El proyecto nace como respuesta a la necesidad de un espacio unificado donde proyectos, usuarios y centros educativos converjan en un entorno digital seguro, escalable y con una experiencia de usuario de alta fidelidad.

---

## 🏛️ Arquitectura del Sistema

La aplicación sigue un modelo de desarrollo basado en la separación de responsabilidades (**Decoupled Architecture**), permitiendo que el cliente y el servidor evolucionen de forma independiente.

### 1. Frontend (Capa de Presentación)

Localizado en la carpeta `/frontend`, implementa una Single Page Application (SPA) con **Angular**.

- **Diseño**: Sistema de diseño basado en _Glassmorphism_ (cristalismo) con SCSS avanzado.
- **Gestión de Estado**: Servicios reactivos basados en RxJS para la sincronización de datos.
- **Accesibilidad**: Cumplimiento de estándares semánticos HTML5 y atributos ARIA.

### 2. Backend (Capa de Negocio)

Ubicado en la carpeta `/backend`, expone una **API RESTful** robusta construida con **Node.js** y **Express**.

- **Lógica**: Implementada en TypeScript para garantizar la integridad de los datos.
- **Seguridad**: Autenticación y autorización mediante **JSON Web Tokens (JWT)** y middlewares de control de acceso.
- **Persistencia**: Base de datos relacional **MySQL** con una arquitectura de modelos normalizada.

---

## 🚀 Despliegue y Ejecución

Para una correcta puesta en marcha del ecosistema, consulte las guías específicas en cada módulo:

1. [Configuración del Servidor y Base de Datos (Backend)](./backend/README.md)
2. [Configuración de la Interfaz de Usuario (Frontend)](./frontend/README.md)

---

## 📂 Estructura del Proyecto

```plaintext
├── 📁 backend
│ ├── 📁 bbdd
│ │ └── 📄 campushub.sql
│ ├── 📁 src
│ │ ├── 📁 controllers
│ │ │ ├── 📄 centroController.ts
│ │ │ ├── 📄 cursoController.ts
│ │ │ ├── 📄 moduloController.ts
│ │ │ ├── 📄 projectController.ts
│ │ │ ├── 📄 relationController.ts
│ │ │ ├── 📄 rolController.ts
│ │ │ ├── 📄 tituloController.ts
│ │ │ └── 📄 userController.ts
│ │ ├── 📁 db
│ │ │ └── 📄 index.ts
│ │ ├── 📁 middleware
│ │ │ └── 📄 authMiddleware.ts
│ │ ├── 📁 models
│ │ │ ├── 📄 centroModel.ts
│ │ │ ├── 📄 cursoModel.ts
│ │ │ ├── 📄 moduloModel.ts
│ │ │ ├── 📄 projectModel.ts
│ │ │ ├── 📄 rolModel.ts
│ │ │ ├── 📄 tituloModel.ts
│ │ │ └── 📄 userModel.ts
│ │ ├── 📁 routes
│ │ │ ├── 📄 centroRoutes.ts
│ │ │ ├── 📄 cursoRoutes.ts
│ │ │ ├── 📄 index.ts
│ │ │ ├── 📄 moduloRoutes.ts
│ │ │ ├── 📄 projectRoutes.ts
│ │ │ ├── 📄 relationRoutes.ts
│ │ │ ├── 📄 rolRoutes.ts
│ │ │ ├── 📄 tituloRoutes.ts
│ │ │ └── 📄 userRoutes.ts
│ │ ├── 📁 sql
│ │ │ └── 📄 schema.sql
│ │ ├── 📁 utils
│ │ │ └── 📄 hash.ts
│ │ └── 📄 types.ts
│ ├── ⚙️ .gitattributes
│ ├── ⚙️ .gitignore
│ ├── 📝 README.md
│ ├── ⚙️ package-lock.json
│ ├── ⚙️ package.json
│ ├── 📄 server.ts
│ └── ⚙️ tsconfig.json
├── 📁 frontend
│ ├── 📁 src
│ │ ├── 📁 app
│ │ │ ├── 📁 core
│ │ │ │ ├── 📁 guards
│ │ │ │ │ ├── 📄 auth.guard.spec.ts
│ │ │ │ │ ├── 📄 auth.guard.ts
│ │ │ │ │ ├── 📄 role.guard.spec.ts
│ │ │ │ │ └── 📄 role.guard.ts
│ │ │ │ ├── 📁 interceptors
│ │ │ │ │ ├── 📄 error.interceptor.spec.ts
│ │ │ │ │ ├── 📄 error.interceptor.ts
│ │ │ │ │ ├── 📄 token.interceptor.spec.ts
│ │ │ │ │ └── 📄 token.interceptor.ts
│ │ │ │ ├── 📁 models
│ │ │ │ │ ├── 📄 project.model.ts
│ │ │ │ │ └── 📄 user.model.ts
│ │ │ │ └── 📁 services
│ │ │ │ ├── 📄 api.service.spec.ts
│ │ │ │ ├── 📄 api.service.ts
│ │ │ │ ├── 📄 auth.service.spec.ts
│ │ │ │ ├── 📄 auth.service.ts
│ │ │ │ ├── 📄 master-data.service.ts
│ │ │ │ ├── 📄 notification.service.ts
│ │ │ │ ├── 📄 project.service.ts
│ │ │ │ ├── 📄 storage.service.spec.ts
│ │ │ │ ├── 📄 storage.service.ts
│ │ │ │ ├── 📄 ui.service.spec.ts
│ │ │ │ ├── 📄 ui.service.ts
│ │ │ │ └── 📄 user.service.ts
│ │ │ ├── 📁 features
│ │ │ │ ├── 📁 admin
│ │ │ │ │ ├── 📁 center-management
│ │ │ │ │ │ ├── 🌐 center-management.component.html
│ │ │ │ │ │ ├── 🎨 center-management.component.scss
│ │ │ │ │ │ └── 📄 center-management.component.ts
│ │ │ │ │ ├── 📁 dashboard
│ │ │ │ │ │ ├── 🌐 dashboard.component.html
│ │ │ │ │ │ └── 📄 dashboard.component.ts
│ │ │ │ │ ├── 📁 register
│ │ │ │ │ │ ├── 🌐 user-register.component.html
│ │ │ │ │ │ ├── 🎨 user-register.component.scss
│ │ │ │ │ │ └── 📄 user-register.component.ts
│ │ │ │ │ ├── 📁 roles
│ │ │ │ │ │ ├── 🌐 role-management.component.html
│ │ │ │ │ │ ├── 🎨 role-management.component.scss
│ │ │ │ │ │ └── 📄 role-management.component.ts
│ │ │ │ │ └── 📁 users
│ │ │ │ │ ├── 🌐 user-list.component.html
│ │ │ │ │ ├── 🎨 user-list.component.scss
│ │ │ │ │ ├── 📄 user-list.component.ts
│ │ │ │ │ ├── 🌐 user-project-management.component.html
│ │ │ │ │ ├── 🎨 user-project-management.component.scss
│ │ │ │ │ └── 📄 user-project-management.component.ts
│ │ │ │ ├── 📁 auth
│ │ │ │ │ └── 📁 login
│ │ │ │ │ ├── 🌐 login.component.html
│ │ │ │ │ ├── 🎨 login.component.scss
│ │ │ │ │ ├── 📄 login.component.spec.ts
│ │ │ │ │ └── 📄 login.component.ts
│ │ │ │ ├── 📁 home
│ │ │ │ │ ├── 🌐 home.component.html
│ │ │ │ │ ├── 📄 home.component.spec.ts
│ │ │ │ │ └── 📄 home.component.ts
│ │ │ │ └── 📁 projects
│ │ │ │ ├── 📁 project-detail
│ │ │ │ │ ├── 🌐 project-detail.component.html
│ │ │ │ │ ├── 📄 project-detail.component.spec.ts
│ │ │ │ │ └── 📄 project-detail.component.ts
│ │ │ │ └── 📁 project-upload
│ │ │ │ ├── 🌐 project-upload.component.html
│ │ │ │ ├── 🎨 project-upload.component.scss
│ │ │ │ ├── 📄 project-upload.component.spec.ts
│ │ │ │ └── 📄 project-upload.component.ts
│ │ │ ├── 📁 layout
│ │ │ │ ├── 📁 admin-layout
│ │ │ │ │ ├── 📁 sidebar
│ │ │ │ │ │ ├── 🌐 sidebar.component.html
│ │ │ │ │ │ ├── 📄 sidebar.component.spec.ts
│ │ │ │ │ │ └── 📄 sidebar.component.ts
│ │ │ │ │ ├── 🌐 admin-layout.component.html
│ │ │ │ │ ├── 📄 admin-layout.component.spec.ts
│ │ │ │ │ └── 📄 admin-layout.component.ts
│ │ │ │ └── 📁 main-layout
│ │ │ │ ├── 📁 footer
│ │ │ │ │ ├── 🌐 footer.component.html
│ │ │ │ │ └── 📄 footer.component.ts
│ │ │ │ ├── 📁 header
│ │ │ │ │ ├── 🌐 header.component.html
│ │ │ │ │ ├── 📄 header.component.spec.ts
│ │ │ │ │ └── 📄 header.component.ts
│ │ │ │ ├── 🌐 main-layout.component.html
│ │ │ │ ├── 📄 main-layout.component.spec.ts
│ │ │ │ └── 📄 main-layout.component.ts
│ │ │ ├── 📁 shared
│ │ │ │ ├── 📁 components
│ │ │ │ │ ├── 📁 alert-msg
│ │ │ │ │ │ ├── 🌐 alert-msg.component.html
│ │ │ │ │ │ ├── 📄 alert-msg.component.spec.ts
│ │ │ │ │ │ └── 📄 alert-msg.component.ts
│ │ │ │ │ ├── 📁 confirmation-modal
│ │ │ │ │ │ ├── 🌐 confirmation-modal.component.html
│ │ │ │ │ │ ├── 🎨 confirmation-modal.component.scss
│ │ │ │ │ │ └── 📄 confirmation-modal.component.ts
│ │ │ │ │ ├── 📁 loading-spinner
│ │ │ │ │ │ ├── 🌐 loading-spinner.component.html
│ │ │ │ │ │ ├── 📄 loading-spinner.component.spec.ts
│ │ │ │ │ │ └── 📄 loading-spinner.component.ts
│ │ │ │ │ ├── 📁 notification-toast
│ │ │ │ │ │ ├── 🎨 notification-toast.component.scss
│ │ │ │ │ │ └── 📄 notification-toast.component.ts
│ │ │ │ │ └── 📁 project-card
│ │ │ │ │ ├── 🌐 project-card.component.html
│ │ │ │ │ ├── 🎨 project-card.component.scss
│ │ │ │ │ ├── 📄 project-card.component.spec.ts
│ │ │ │ │ └── 📄 project-card.component.ts
│ │ │ │ ├── 📁 directives
│ │ │ │ │ ├── 📄 img-fallback.directive.spec.ts
│ │ │ │ │ └── 📄 img-fallback.directive.ts
│ │ │ │ └── 📁 pipes
│ │ │ │ ├── 📄 truncate.pipe.spec.ts
│ │ │ │ └── 📄 truncate.pipe.ts
│ │ │ ├── 🌐 app.component.html
│ │ │ ├── 📄 app.component.spec.ts
│ │ │ ├── 📄 app.component.ts
│ │ │ └── 📄 app.routes.ts
│ │ ├── 📁 assets
│ │ │ ├── 📁 images
│ │ │ │ ├── 📁 projects
│ │ │ │ │ ├── 🖼️ calendario_academico_cover.png
│ │ │ │ │ ├── 🖼️ dashboard_docente_cover.png

│ │ │ │ ├── 🖼️ GitHub.png
│ │ │ │ ├── 🖼️ LogoTxtV2.png
│ │ │ │ ├── 🖼️ LogoV2.png
│ │ │ │ ├── 🖼️ logo.png.png
│ │ │ │ └── 🖼️ logoTxt.png.png
│ │ │ └── ⚙️ .gitkeep
│ │ ├── 📁 environments
│ │ │ ├── 📄 environment.development.ts
│ │ │ ├── 📄 environment.prod.ts
│ │ │ └── 📄 environment.ts
│ │ ├── 📁 styles
│ │ │ ├── 📁 base
│ │ │ │ ├── 🎨 \_mixins.scss
│ │ │ │ ├── 🎨 \_reset.scss
│ │ │ │ ├── 🎨 \_utilities.scss
│ │ │ │ └── 🎨 \_variables.scss
│ │ │ ├── 📁 components
│ │ │ │ ├── 🎨 \_buttons.scss
│ │ │ │ ├── 🎨 \_cards.scss
│ │ │ │ └── 🎨 \_inputs.scss
│ │ │ ├── 📁 layout
│ │ │ │ ├── 📁 admin
│ │ │ │ │ ├── 🎨 \_admin-layout.scss
│ │ │ │ │ └── 🎨 \_sidebar.scss
│ │ │ │ ├── 🎨 \_footer.scss
│ │ │ │ └── 🎨 \_header.scss
│ │ │ ├── 📁 pages
│ │ │ │ ├── 📁 admin
│ │ │ │ │ ├── 🎨 \_dashboard.scss
│ │ │ │ │ ├── 🎨 \_role-management.scss
│ │ │ │ │ ├── 🎨 \_user-list.scss
│ │ │ │ │ ├── 🎨 \_user-project-management.scss
│ │ │ │ │ └── 🎨 \_user-register.scss
│ │ │ │ ├── 🎨 \_home.scss
│ │ │ │ ├── 🎨 \_login.scss
│ │ │ │ ├── 🎨 \_projects.scss
│ │ │ │ ├── 🎨 \_register.scss
│ │ │ │ └── 🎨 \_upload.scss
│ │ │ ├── 🎨 main.css
│ │ │ └── 🎨 main.scss
│ │ ├── 🌐 index.html
│ │ ├── 📄 main.ts
│ │ ├── 🎨 styles.css
│ │ └── 🎨 styles.scss
│ ├── ⚙️ .editorconfig
│ ├── ⚙️ .gitignore
│ ├── 📝 README.md
│ ├── ⚙️ angular.json
│ ├── ⚙️ package-lock.json
│ ├── ⚙️ package.json
│ ├── ⚙️ tsconfig.app.json
│ ├── ⚙️ tsconfig.json
│ └── ⚙️ tsconfig.spec.json
├── ⚙️ .gitignore
└── 📝 README.md

```

---

## 🛠️ Requisitos Técnicos

- **Entorno**: Node.js v18+ y npm v9+.
- **Base de Datos**: MySQL v8.0+.
- **Cliente**: Navegadores modernos con soporte para CSS Grid y Backdrop-filter.

---

2024 CampusHub &middot; Proyecto Integrado de Ciclo Formativo de Grado Superior.
