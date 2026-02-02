# 🎨 CampusHub Frontend

Aplicación web desarrollada en **Angular 16+** que sirve como interfaz de usuario para la plataforma CampusHub. Diseñada con un enfoque moderno, modular y responsivo.

## 🚀 Tecnologías Clave

- **Angular 16**: Framework principal.
- **TypeScript 5**: Tipado estático robusto.
- **SCSS**: Preprocesador CSS con arquitectura 7-1 (Base, Components, Layout, Pages, Themes, Abstracts, Vendors).
- **RxJS**: Gestión reactiva del estado y peticiones HTTP.
- **Glassmorphism**: Estilo visual predominante en el panel de administración.

## 📂 Estructura del Proyecto

```text
src/app/
├── core/               # Lógica de negocio esencial (Singleton)
│   ├── guards/         # Protección de rutas (AuthGuard)
│   ├── interceptors/   # Interceptores HTTP (TokenInterceptor)
│   ├── services/       # Comunicación con API (AuthService)
│   └── models/         # Interfaces de datos TS
├── features/           # Módulos funcionales
│   ├── admin/          # Panel de administración (Dashboard, Usuarios, Roles)
│   ├── auth/           # Login y Registro
│   ├── home/           # Página de inicio
│   └── projects/       # Catálogo y gestión de proyectos
├── layout/             # Componentes estructurales
│   ├── admin-layout/   # Layout específico para admin (Sidebar)
│   └── main-layout/    # Layout público (Header/Footer)
└── shared/             # Reutilizables (Spinners, Pipes, Directivas)
```

## 🛡️ Funcionalidades Implementadas

### Módulo Público

- **Catálogo de Proyectos**: Visualización de proyectos aprobados.
- **Registro de Alumnos**: Formulario de alta para nuevos usuarios.
- **Login**: Autenticación segura con JWT.

### Módulo de Administración (Protegido)

- **Dashboard**: Vista general con estadísticas clave.
- **Gestión de Usuarios**: Listado completo, búsqueda y visualización de tokens.
- **Gestión de Roles**: Asignación dinámica de roles (Admin, Gestor, Profesor) a usuarios.
- **Asignación de Proyectos**: Control de visibilidad de proyectos por usuario.
- **Gestión de Centros**: Alta y modificación de centros educativos.

## 🔧 Configuración y Ejecución

1. **Instalar dependencias**:

   ```bash
   npm install
   ```

2. **Servidor de Desarrollo**:

   ```bash
   ng serve
   ```

   Navega a `http://localhost:4200`.

3. **Build de Producción**:
   ```bash
   ng build
   ```

## 🎨 Sistema de Diseño

El proyecto utiliza una arquitectura de estilos centralizada en `src/styles`.

- `main.scss`: Punto de entrada que importa todos los parciales.
- `base/_variables.scss`: Paleta de colores, tipografía y espaciados.
- `base/_mixins.scss`: Utilidades para media queries y flexbox.

Los componentes utilizan **ViewEncapsulation.Emulated** (por defecto) pero importan variables globales para mantener la consistencia.
