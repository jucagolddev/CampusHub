Estructura CAMPUS HUB

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
