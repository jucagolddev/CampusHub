# CampusHub Frontend: Interfaz de Usuario y Experiencia Digital

La interfaz de **CampusHub** es una aplicación cliente de alto nivel desarrollada con **Angular**. El diseño se centra en la claridad, la interactividad y la estética profesional, aplicando tendencias modernas de diseño de interfaces para entornos académicos.

---

## 🎨 Sistema de Diseño: Glassmorphism Premium

El proyecto implementa un lenguaje visual coherente basado en el **Glassmorphism** (Efecto Cristal), utilizando transparencias, difuminados y sombras profundas para crear una jerarquía visual moderna y limpia.

- **Fidelidad Visual**: Uso de efectos `backdrop-filter` y gradientes suaves.
- **Interactividad**: Micro-animaciones en botones, tarjetas y campos de entrada para un feedback de usuario gratificante.
- **Tipografía**: Jerarquía de fuentes clara y moderna para facilitar la legibilidad institucional.

---

## 🏗️ Arquitectura de Componentes

La aplicación se organiza siguiendo una estructura modular optimizada para la escalabilidad:

- **Core/Shared**: Servicios globales, componentes reutilizables (modales, alertas, toasts) y guardias de seguridad.
- **Features**: Módulos independientes que encapsulan funcionalidades de negocio (Administración, Gestión de Proyectos, Autenticación).
- **Layout**: Estructura base de la aplicación (Header con efecto cristal, Sidebar administrativa y Footer oscuro premium).

**Generated:** 2/6/2026, 3:14:29 AM
**Root Path:** `c:\xampp\htdocs\CampusHub`

```
├── 📁 backend
│   ├── 📁 bbdd
│   │   └── 📄 campushub.sql
│   ├── 📁 src
│   │   ├── 📁 controllers
│   │   │   ├── 📄 centroController.ts
│   │   │   ├── 📄 cursoController.ts
│   │   │   ├── 📄 moduloController.ts
│   │   │   ├── 📄 projectController.ts
│   │   │   ├── 📄 relationController.ts
│   │   │   ├── 📄 rolController.ts
│   │   │   ├── 📄 tituloController.ts
│   │   │   └── 📄 userController.ts
│   │   ├── 📁 db
│   │   │   └── 📄 index.ts
│   │   ├── 📁 middleware
│   │   │   └── 📄 authMiddleware.ts
│   │   ├── 📁 models
│   │   │   ├── 📄 centroModel.ts
│   │   │   ├── 📄 cursoModel.ts
│   │   │   ├── 📄 moduloModel.ts
│   │   │   ├── 📄 projectModel.ts
│   │   │   ├── 📄 rolModel.ts
│   │   │   ├── 📄 tituloModel.ts
│   │   │   └── 📄 userModel.ts
│   │   ├── 📁 routes
│   │   │   ├── 📄 centroRoutes.ts
│   │   │   ├── 📄 cursoRoutes.ts
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 moduloRoutes.ts
│   │   │   ├── 📄 projectRoutes.ts
│   │   │   ├── 📄 relationRoutes.ts
│   │   │   ├── 📄 rolRoutes.ts
│   │   │   ├── 📄 tituloRoutes.ts
│   │   │   └── 📄 userRoutes.ts
│   │   ├── 📁 sql
│   │   │   └── 📄 schema.sql
│   │   ├── 📁 utils
│   │   │   └── 📄 hash.ts
│   │   └── 📄 types.ts
│   ├── ⚙️ .gitattributes
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── 📄 check_user.js
│   ├── 📄 db.js
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📄 server.ts
│   ├── 📄 test_api.ts
│   └── ⚙️ tsconfig.json
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 app
│   │   │   ├── 📁 core
│   │   │   │   ├── 📁 guards
│   │   │   │   │   ├── 📄 auth.guard.spec.ts
│   │   │   │   │   ├── 📄 auth.guard.ts
│   │   │   │   │   ├── 📄 role.guard.spec.ts
│   │   │   │   │   └── 📄 role.guard.ts
│   │   │   │   ├── 📁 interceptors
│   │   │   │   │   ├── 📄 error.interceptor.spec.ts
│   │   │   │   │   ├── 📄 error.interceptor.ts
│   │   │   │   │   ├── 📄 token.interceptor.spec.ts
│   │   │   │   │   └── 📄 token.interceptor.ts
│   │   │   │   ├── 📁 models
│   │   │   │   │   ├── 📄 project.model.ts
│   │   │   │   │   ├── 📄 project.ts
│   │   │   │   │   ├── 📄 user.model.ts
│   │   │   │   │   └── 📄 user.ts
│   │   │   │   └── 📁 services
│   │   │   │       ├── 📄 api.service.spec.ts
│   │   │   │       ├── 📄 api.service.ts
│   │   │   │       ├── 📄 auth.service.spec.ts
│   │   │   │       ├── 📄 auth.service.ts
│   │   │   │       ├── 📄 master-data.service.ts
│   │   │   │       ├── 📄 notification.service.ts
│   │   │   │       ├── 📄 project.service.ts
│   │   │   │       ├── 📄 storage.service.spec.ts
│   │   │   │       ├── 📄 storage.service.ts
│   │   │   │       ├── 📄 ui.service.spec.ts
│   │   │   │       ├── 📄 ui.service.ts
│   │   │   │       └── 📄 user.service.ts
│   │   │   ├── 📁 features
│   │   │   │   ├── 📁 admin
│   │   │   │   │   ├── 📁 center-management
│   │   │   │   │   │   ├── 🌐 center-management.component.html
│   │   │   │   │   │   ├── 🎨 center-management.component.scss
│   │   │   │   │   │   └── 📄 center-management.component.ts
│   │   │   │   │   ├── 📁 dashboard
│   │   │   │   │   │   ├── 🌐 dashboard.component.html
│   │   │   │   │   │   └── 📄 dashboard.component.ts
│   │   │   │   │   ├── 📁 register
│   │   │   │   │   │   ├── 🌐 user-register.component.html
│   │   │   │   │   │   ├── 🎨 user-register.component.scss
│   │   │   │   │   │   └── 📄 user-register.component.ts
│   │   │   │   │   ├── 📁 roles
│   │   │   │   │   │   ├── 🌐 role-management.component.html
│   │   │   │   │   │   ├── 🎨 role-management.component.scss
│   │   │   │   │   │   └── 📄 role-management.component.ts
│   │   │   │   │   └── 📁 users
│   │   │   │   │       ├── 🌐 user-list.component.html
│   │   │   │   │       ├── 🎨 user-list.component.scss
│   │   │   │   │       ├── 📄 user-list.component.ts
│   │   │   │   │       ├── 🌐 user-project-management.component.html
│   │   │   │   │       ├── 🎨 user-project-management.component.scss
│   │   │   │   │       └── 📄 user-project-management.component.ts
│   │   │   │   ├── 📁 auth
│   │   │   │   │   └── 📁 login
│   │   │   │   │       ├── 🌐 login.component.html
│   │   │   │   │       ├── 🎨 login.component.scss
│   │   │   │   │       ├── 📄 login.component.spec.ts
│   │   │   │   │       └── 📄 login.component.ts
│   │   │   │   ├── 📁 home
│   │   │   │   │   ├── 🌐 home.component.html
│   │   │   │   │   ├── 📄 home.component.spec.ts
│   │   │   │   │   └── 📄 home.component.ts
│   │   │   │   └── 📁 projects
│   │   │   │       ├── 📁 project-detail
│   │   │   │       │   ├── 🌐 project-detail.component.html
│   │   │   │       │   ├── 📄 project-detail.component.spec.ts
│   │   │   │       │   └── 📄 project-detail.component.ts
│   │   │   │       └── 📁 project-upload
│   │   │   │           ├── 🌐 project-upload.component.html
│   │   │   │           ├── 🎨 project-upload.component.scss
│   │   │   │           ├── 📄 project-upload.component.spec.ts
│   │   │   │           └── 📄 project-upload.component.ts
│   │   │   ├── 📁 layout
│   │   │   │   ├── 📁 admin-layout
│   │   │   │   │   ├── 📁 sidebar
│   │   │   │   │   │   ├── 🌐 sidebar.component.html
│   │   │   │   │   │   ├── 📄 sidebar.component.spec.ts
│   │   │   │   │   │   └── 📄 sidebar.component.ts
│   │   │   │   │   ├── 🌐 admin-layout.component.html
│   │   │   │   │   ├── 📄 admin-layout.component.spec.ts
│   │   │   │   │   └── 📄 admin-layout.component.ts
│   │   │   │   └── 📁 main-layout
│   │   │   │       ├── 📁 footer
│   │   │   │       │   ├── 🌐 footer.component.html
│   │   │   │       │   └── 📄 footer.component.ts
│   │   │   │       ├── 📁 header
│   │   │   │       │   ├── 🌐 header.component.html
│   │   │   │       │   ├── 📄 header.component.spec.ts
│   │   │   │       │   └── 📄 header.component.ts
│   │   │   │       ├── 🌐 main-layout.component.html
│   │   │   │       ├── 📄 main-layout.component.spec.ts
│   │   │   │       └── 📄 main-layout.component.ts
│   │   │   ├── 📁 shared
│   │   │   │   ├── 📁 components
│   │   │   │   │   ├── 📁 alert-msg
│   │   │   │   │   │   ├── 🌐 alert-msg.component.html
│   │   │   │   │   │   ├── 📄 alert-msg.component.spec.ts
│   │   │   │   │   │   └── 📄 alert-msg.component.ts
│   │   │   │   │   ├── 📁 confirmation-modal
│   │   │   │   │   │   ├── 🌐 confirmation-modal.component.html
│   │   │   │   │   │   ├── 🎨 confirmation-modal.component.scss
│   │   │   │   │   │   └── 📄 confirmation-modal.component.ts
│   │   │   │   │   ├── 📁 loading-spinner
│   │   │   │   │   │   ├── 🌐 loading-spinner.component.html
│   │   │   │   │   │   ├── 📄 loading-spinner.component.spec.ts
│   │   │   │   │   │   └── 📄 loading-spinner.component.ts
│   │   │   │   │   ├── 📁 notification-toast
│   │   │   │   │   │   ├── 🎨 notification-toast.component.scss
│   │   │   │   │   │   └── 📄 notification-toast.component.ts
│   │   │   │   │   └── 📁 project-card
│   │   │   │   │       ├── 🌐 project-card.component.html
│   │   │   │   │       ├── 🎨 project-card.component.scss
│   │   │   │   │       ├── 📄 project-card.component.spec.ts
│   │   │   │   │       └── 📄 project-card.component.ts
│   │   │   │   ├── 📁 directives
│   │   │   │   │   ├── 📄 img-fallback.directive.spec.ts
│   │   │   │   │   └── 📄 img-fallback.directive.ts
│   │   │   │   └── 📁 pipes
│   │   │   │       ├── 📄 truncate.pipe.spec.ts
│   │   │   │       └── 📄 truncate.pipe.ts
│   │   │   ├── 🌐 app.component.html
│   │   │   ├── 📄 app.component.spec.ts
│   │   │   ├── 📄 app.component.ts
│   │   │   └── 📄 app.routes.ts
│   │   ├── 📁 assets
│   │   │   ├── 📁 images
│   │   │   │   ├── 📁 projects
│   │   │   │   │   ├── 🖼️ calendario_academico_cover.png
│   │   │   │   │   ├── 🖼️ dashboard_docente_cover.png
│   │   │   │   │   └── 🖼️ eusa_quiz_cover.png
│   │   │   │   ├── 🖼️ GitHub.png
│   │   │   │   ├── 🖼️ LogoTxtV2.png
│   │   │   │   ├── 🖼️ LogoV2.png
│   │   │   │   ├── 🖼️ logo.png.png
│   │   │   │   └── 🖼️ logoTxt.png.png
│   │   │   └── ⚙️ .gitkeep
│   │   ├── 📁 environments
│   │   │   ├── 📄 environment.development.ts
│   │   │   ├── 📄 environment.prod.ts
│   │   │   └── 📄 environment.ts
│   │   ├── 📁 layout
│   │   │   ├── 📁 admin-layout
│   │   │   │   └── 📁 sidebar
│   │   │   │       ├── 🌐 sidebar.component.html
│   │   │   │       ├── 📄 sidebar.component.spec.ts
│   │   │   │       └── 📄 sidebar.component.ts
│   │   │   └── 📁 main-layout
│   │   │       ├── 📁 footer
│   │   │       │   ├── 🌐 footer.component.html
│   │   │       │   ├── 📄 footer.component.spec.ts
│   │   │       │   └── 📄 footer.component.ts
│   │   │       └── 📁 header
│   │   │           ├── 🌐 header.component.html
│   │   │           ├── 📄 header.component.spec.ts
│   │   │           └── 📄 header.component.ts
│   │   ├── 📁 styles
│   │   │   ├── 📁 base
│   │   │   │   ├── 🎨 _mixins.scss
│   │   │   │   ├── 🎨 _reset.scss
│   │   │   │   ├── 🎨 _utilities.scss
│   │   │   │   └── 🎨 _variables.scss
│   │   │   ├── 📁 components
│   │   │   │   ├── 🎨 _buttons.scss
│   │   │   │   ├── 🎨 _cards.scss
│   │   │   │   └── 🎨 _inputs.scss
│   │   │   ├── 📁 layout
│   │   │   │   ├── 📁 admin
│   │   │   │   │   ├── 🎨 _admin-layout.scss
│   │   │   │   │   └── 🎨 _sidebar.scss
│   │   │   │   ├── 🎨 _footer.scss
│   │   │   │   └── 🎨 _header.scss
│   │   │   ├── 📁 pages
│   │   │   │   ├── 📁 admin
│   │   │   │   │   ├── 🎨 _dashboard.scss
│   │   │   │   │   ├── 🎨 _role-management.scss
│   │   │   │   │   ├── 🎨 _user-list.scss
│   │   │   │   │   ├── 🎨 _user-project-management.scss
│   │   │   │   │   └── 🎨 _user-register.scss
│   │   │   │   ├── 🎨 _home.scss
│   │   │   │   ├── 🎨 _login.scss
│   │   │   │   ├── 🎨 _projects.scss
│   │   │   │   ├── 🎨 _register.scss
│   │   │   │   └── 🎨 _upload.scss
│   │   │   ├── 🎨 main.css
│   │   │   └── 🎨 main.scss
│   │   ├── 🌐 index.html
│   │   ├── 📄 main.ts
│   │   ├── 🎨 styles.css
│   │   └── 🎨 styles.scss
│   ├── ⚙️ .editorconfig
│   ├── ⚙️ .gitignore
│   ├── 📝 README.md
│   ├── ⚙️ angular.json
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   └── ⚙️ tsconfig.spec.json
├── ⚙️ .gitignore
├── 📝 Estructura.md
└── 📝 README.md
```

---

## 🛠️ Tecnologías y Herramientas

- **Framework**: Angular v16+ (Arquitectura basada en componentes y servicios reactivos).
- **Lenguaje**: TypeScript (Código robusto, tipado y mantenible).
- **Estilos**: SCSS (Hojas de estilo modulares con uso intensivo de variables y mixins).
- **Gestión de Datos**: RxJS (Programación reactiva para la comunicación con la API).

---

## ♿ Accesibilidad y SEO

Se han implementado estándares de accesibilidad para garantizar un uso inclusivo:

- **Semántica HTML5**: Uso correcto de etiquetas para una estructura lógica.
- **Navegación**: Jerarquía de encabezados (`H1`) controlada por página.
- **Lectores de Pantalla**: Inclusión de etiquetas `aria-label` y descripciones en iconos y botones de acción.

---

## 🚀 Guía de Desarrollo Local

1. Navegar al directorio `/frontend`.
2. Ejecutar `npm install` para consolidar el entorno de dependencias.
3. Iniciar el servidor de desarrollo: `npm start` (disponible en `localhost:4200`).
4. Compilar para despliegue final: `npm run build`.

---

© 2024 CampusHub &middot; Interfaz de Usuario para Plataformas Universitarias.
