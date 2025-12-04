Estructura CAMPUS HUB
## 📂 Estructura del Proyecto y Definición de Carpetas

Este proyecto sigue una arquitectura **Monorepo** dividida en Backend (API) y Frontend (Cliente SPA), diseñada para ser escalable y mantenible.

### 🟢 BACKEND (`/backend`)
Implementa el patrón **MVC (Modelo-Vista-Controlador)**. Esta capa gestiona la lógica de negocio, la seguridad y los datos.

* **`src/config/`**: Contiene la configuración esencial del servidor.
    * Aquí residen `db.config.ts` (conexión a la base de datos) y `env.config.ts` (gestión de variables de entorno como puertos y claves secretas).
* **`src/controllers/`**: El **Cerebro** de la aplicación.
    * Contiene las funciones lógicas que reciben las peticiones de las rutas, procesan la información y devuelven una respuesta. (Ej: `auth.controller` gestiona el login, `project.controller` gestiona la creación de proyectos).
* **`src/middlewares/`**: Los **Guardianes** del servidor.
    * Funciones que se ejecutan *antes* de llegar al controlador. Se encargan de verificar tokens JWT (`auth.middleware`), gestionar subidas de archivos (`upload.middleware`) y capturar errores globales (`error.middleware`).
* **`src/models/`**: La **Definición de Datos**.
    * Esquemas que definen la estructura de la información en la base de datos (Ej: Un `User` tiene email y rol; un `Project` tiene título y autor).
* **`src/routes/`**: El **Mapa de la API**.
    * Define los endpoints (URLs) disponibles para que el frontend los consuma (Ej: `GET /api/projects`, `POST /api/login`).

---

### 🔵 FRONTEND (`/frontend`)
Aplicación SPA construida con **Angular 16+**, siguiendo una arquitectura modular y el patrón **MVVM**.

#### 1. 🧠 CORE (`src/app/core/`)
El núcleo de la aplicación. Contiene la lógica que **se carga una sola vez (Singletons)** y servicios transversales.

* **`guards/`**: Lógica de seguridad para el Router.
    * Protege las rutas para que solo entren usuarios logueados (`auth.guard`) o con rol de colaborador (`role.guard`).
* **`interceptors/`**: Intermediarios HTTP.
    * Inyectan el Token de sesión en cada petición (`token.interceptor`) y manejan errores de red globales (`error.interceptor`).
* **`models/`**: Interfaces TypeScript.
    * Contratos de datos (`user.ts`, `project.ts`) para asegurar el tipado estricto entre front y back.
* **`services/`**: Gestión de estado y comunicación.
    * Servicios globales para conectar con la API (`api.service`), gestionar la sesión (`auth.service`), manejar el almacenamiento local (`storage.service`) y controlar la UI global (`ui.service`).

#### 2. 🚀 FEATURES (`src/app/features/`)
Contiene las **Vistas/Páginas** principales de la aplicación, organizadas por funcionalidad de negocio.

* **`auth/`**: Módulo de autenticación (Páginas de Login y Registro).
* **`home/`**: Página de inicio (Landing Page) pública.
* **`projects/`**: Módulo principal de la aplicación.
    * **`project-list`**: Catálogo público de proyectos.
    * **`project-detail`**: Vista detallada de un proyecto individual.
    * **`project-upload`**: (Área Privada) Formulario para subir nuevos proyectos.

#### 3. 🖼️ LAYOUT (`src/app/layout/`)
Define los **Marcos Estructurales** que envuelven el contenido, diferenciando la experiencia según el usuario.

* **`main-layout/`**: Estructura para la parte pública (Alumnos/Visitantes). Contiene el `Header` y `Footer`.
* **`admin-layout/`**: Estructura para la parte privada (Colaboradores). Contiene el `Sidebar` de gestión.

#### 4. ♻️ SHARED (`src/app/shared/`)
Biblioteca de elementos reutilizables (**Dumb Components**) que no dependen de la lógica de negocio.

* **`components/`**: Elementos visuales genéricos como Tarjetas de proyecto (`project-card`), Spinners de carga (`loading-spinner`) y Alertas (`alert-msg`).
* **`directives/`**: Comportamientos personalizados (Ej: `img-fallback` para gestionar imágenes rotas).
* **`pipes/`**: Transformadores de datos visuales (Ej: `truncate` para cortar textos largos).

#### 5. 🎨 STYLES (`src/styles/`)
Arquitectura de estilos **SASS Modular (Patrón 7-1)** ubicada fuera de la carpeta `app`.

* **`base/`**: Configuración global (`_variables` con colores corporativos, `_reset`, `_mixins`).
* **`components/`**: Estilos específicos de componentes pequeños (botones, cards, inputs).
* **`layout/`**: Estilos de las estructuras grandes (header, footer).
* **`pages/`**: Estilos específicos para cada vista (`_home`, `_login`, etc.).
* **`main.scss`**: Archivo maestro que importa y unifica todos los parciales.

#### 6. ⚙️ CONFIGURACIÓN Y ASSETS
* **`src/assets/`**: Recursos estáticos como imágenes y logotipos.
* **`src/environments/`**: Configuración de variables según el entorno (Desarrollo `localhost` vs Producción).
```
CampusHub
├── 📁 backend
│   ├── 📁 src
│   │   ├── 📁 config
│   │   │   ├── 📄 db.config.ts
│   │   │   └── 📄 env.config.ts
│   │   ├── 📁 controllers
│   │   │   ├── 📄 auth.controller.ts
│   │   │   ├── 📄 project.controller.ts
│   │   │   └── 📄 user.controller.ts
│   │   ├── 📁 middlewares
│   │   │   ├── 📄 auth.middleware.ts
│   │   │   ├── 📄 error.middleware.ts
│   │   │   └── 📄 upload.middleware.ts
│   │   ├── 📁 models
│   │   │   ├── 📄 Project.ts
│   │   │   └── 📄 User.ts
│   │   ├── 📁 routes
│   │   │   ├── 📄 auth.routes.ts
│   │   │   ├── 📄 index.routes.ts
│   │   │   └── 📄 project.routes.ts
│   │   └── 📄 server.ts
│   ├── ⚙️ package.json
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
│   │   │   │       ├── 📄 storage.service.spec.ts
│   │   │   │       ├── 📄 storage.service.ts
│   │   │   │       ├── 📄 ui.service.spec.ts
│   │   │   │       └── 📄 ui.service.ts
│   │   │   ├── 📁 features
│   │   │   │   ├── 📁 auth
│   │   │   │   │   ├── 📁 login
│   │   │   │   │   │   ├── 🌐 login.component.html
│   │   │   │   │   │   ├── 🎨 login.component.scss
│   │   │   │   │   │   ├── 📄 login.component.spec.ts
│   │   │   │   │   │   └── 📄 login.component.ts
│   │   │   │   │   └── 📁 register
│   │   │   │   │       ├── 🌐 register.component.html
│   │   │   │   │       ├── 🎨 register.component.scss
│   │   │   │   │       ├── 📄 register.component.spec.ts
│   │   │   │   │       └── 📄 register.component.ts
│   │   │   │   ├── 📁 home
│   │   │   │   │   ├── 🌐 home.component.html
│   │   │   │   │   ├── 🎨 home.component.scss
│   │   │   │   │   ├── 📄 home.component.spec.ts
│   │   │   │   │   └── 📄 home.component.ts
│   │   │   │   └── 📁 projects
│   │   │   │       ├── 📁 project-detail
│   │   │   │       │   ├── 🌐 project-detail.component.html
│   │   │   │       │   ├── 🎨 project-detail.component.scss
│   │   │   │       │   ├── 📄 project-detail.component.spec.ts
│   │   │   │       │   └── 📄 project-detail.component.ts
│   │   │   │       ├── 📁 project-list
│   │   │   │       │   ├── 🌐 project-list.component.html
│   │   │   │       │   ├── 🎨 project-list.component.scss
│   │   │   │       │   ├── 📄 project-list.component.spec.ts
│   │   │   │       │   └── 📄 project-list.component.ts
│   │   │   │       └── 📁 project-upload
│   │   │   │           ├── 🌐 project-upload.component.html
│   │   │   │           ├── 🎨 project-upload.component.scss
│   │   │   │           ├── 📄 project-upload.component.spec.ts
│   │   │   │           └── 📄 project-upload.component.ts
│   │   │   ├── 📁 layout
│   │   │   │   ├── 📁 admin-layout
│   │   │   │   │   ├── 📁 sidebar
│   │   │   │   │   │   ├── 🌐 sidebar.component.html
│   │   │   │   │   │   ├── 🎨 sidebar.component.scss
│   │   │   │   │   │   ├── 📄 sidebar.component.spec.ts
│   │   │   │   │   │   └── 📄 sidebar.component.ts
│   │   │   │   │   ├── 🌐 admin-layout.component.html
│   │   │   │   │   ├── 🎨 admin-layout.component.scss
│   │   │   │   │   ├── 📄 admin-layout.component.spec.ts
│   │   │   │   │   └── 📄 admin-layout.component.ts
│   │   │   │   └── 📁 main-layout
│   │   │   │       ├── 📁 footer
│   │   │   │       │   ├── 🌐 footer.component.html
│   │   │   │       │   ├── 🎨 footer.component.scss
│   │   │   │       │   └── 📄 footer.component.ts
│   │   │   │       ├── 📁 header
│   │   │   │       │   ├── 🌐 header.component.html
│   │   │   │       │   ├── 🎨 header.component.scss
│   │   │   │       │   ├── 📄 header.component.spec.ts
│   │   │   │       │   └── 📄 header.component.ts
│   │   │   │       ├── 🌐 main-layout.component.html
│   │   │   │       ├── 🎨 main-layout.component.scss
│   │   │   │       ├── 📄 main-layout.component.spec.ts
│   │   │   │       └── 📄 main-layout.component.ts
│   │   │   ├── 📁 shared
│   │   │   │   ├── 📁 components
│   │   │   │   │   ├── 📁 alert-msg
│   │   │   │   │   │   ├── 🌐 alert-msg.component.html
│   │   │   │   │   │   ├── 🎨 alert-msg.component.scss
│   │   │   │   │   │   ├── 📄 alert-msg.component.spec.ts
│   │   │   │   │   │   └── 📄 alert-msg.component.ts
│   │   │   │   │   ├── 📁 loading-spinner
│   │   │   │   │   │   ├── 🌐 loading-spinner.component.html
│   │   │   │   │   │   ├── 🎨 loading-spinner.component.scss
│   │   │   │   │   │   ├── 📄 loading-spinner.component.spec.ts
│   │   │   │   │   │   └── 📄 loading-spinner.component.ts
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
│   │   │   ├── 📄 app-routing.module.ts
│   │   │   ├── 🌐 app.component.html
│   │   │   ├── 🎨 app.component.scss
│   │   │   ├── 📄 app.component.spec.ts
│   │   │   ├── 📄 app.component.ts
│   │   │   ├── 📄 app.module.ts
│   │   │   └── 📄 app.routes.ts
│   │   ├── 📁 assets
│   │   │   ├── 📁 images
│   │   │   │   ├── 🖼️ LogoTxtV2.png
│   │   │   │   ├── 🖼️ LogoV2.png
│   │   │   │   ├── 🖼️ logo.png.png
│   │   │   │   └── 🖼️ logoTxt.png
│   │   │   └── ⚙️ .gitkeep
│   │   ├── 📁 environments
│   │   │   ├── 📄 environment.development.ts
│   │   │   ├── 📄 environment.prod.ts
│   │   │   └── 📄 environment.ts
│   │   ├── 📁 layout
│   │   │   ├── 📁 admin-layout
│   │   │   │   └── 📁 sidebar
│   │   │   │       ├── 🌐 sidebar.component.html
│   │   │   │       ├── 🎨 sidebar.component.scss
│   │   │   │       ├── 📄 sidebar.component.spec.ts
│   │   │   │       └── 📄 sidebar.component.ts
│   │   │   └── 📁 main-layout
│   │   │       ├── 📁 footer
│   │   │       │   ├── 🌐 footer.component.html
│   │   │       │   ├── 🎨 footer.component.scss
│   │   │       │   ├── 📄 footer.component.spec.ts
│   │   │       │   └── 📄 footer.component.ts
│   │   │       └── 📁 header
│   │   │           ├── 🌐 header.component.html
│   │   │           ├── 🎨 header.component.scss
│   │   │           ├── 📄 header.component.spec.ts
│   │   │           └── 📄 header.component.ts
│   │   ├── 📁 styles
│   │   │   ├── 📁 base
│   │   │   │   ├── 🎨 _mixins.scss
│   │   │   │   ├── 🎨 _reset.scss
│   │   │   │   └── 🎨 _variables.scss
│   │   │   ├── 📁 components
│   │   │   │   ├── 🎨 _buttons.scss
│   │   │   │   ├── 🎨 _cards.scss
│   │   │   │   └── 🎨 _inputs.scss
│   │   │   ├── 📁 layout
│   │   │   │   ├── 🎨 _footer.scss
│   │   │   │   └── 🎨 _header.scss
│   │   │   ├── 📁 pages
│   │   │   │   ├── 🎨 _home.scss
│   │   │   │   ├── 🎨 _login.scss
│   │   │   │   ├── 🎨 _register.scss
│   │   │   │   └── 🎨 _upload.scss
│   │   │   └── 🎨 main.scss
│   │   ├── 🌐 index.html
│   │   ├── 📄 main.ts
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
└── 📝 Estructura.md
```
