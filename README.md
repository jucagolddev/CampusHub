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
CampusHub/
│
├── backend/            # Lógica de servidor, API y modelos de datos
│   ├── src/            # Código fuente en TypeScript
│   └── bbdd/           # Scripts de inicialización de la base de datos
│
├── frontend/           # Interfaz de usuario y lógica de cliente
│   ├── src/app/        # Componentes, servicios y core de Angular
│   └── src/assets/     # Recursos estáticos y branding
│
└── Estructura.md       # Documentación detallada de la organización interna
```

---

## 🛠️ Requisitos Técnicos

- **Entorno**: Node.js v18+ y npm v9+.
- **Base de Datos**: MySQL v8.0+.
- **Cliente**: Navegadores modernos con soporte para CSS Grid y Backdrop-filter.

---

© 2024 CampusHub &middot; Proyecto Integrado de Ciclo Formativo de Grado Superior.
