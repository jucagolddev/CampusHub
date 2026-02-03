# CampusHub: Plataforma de Gestión Universitaria

![CampusHub Logo](https://via.placeholder.com/150) <!-- Por favor reemplazar con logo real si existe -->

**CampusHub** es una solución integral diseñada para la administración y gestión eficiente de recursos universitarios. Este proyecto implementa una arquitectura moderna **MEAN** (MongoDB, Express.js, Angular, Node.js) para ofrecer una experiencia de usuario fluida y escalable.

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
5. [Estructura del Repositorio](#estructura-del-repositorio)
6. [Equipo de Desarrollo](#equipo-de-desarrollo)

---

## 🌟 Visión General

Nuestro objetivo es centralizar la información académica y administrativa en una sola plataforma, permitiendo a administradores, profesores y alumnos interactuar de manera sencilla.

### Funcionalidades Clave

- **Gestión de Usuarios**: Roles diferenciados (Admin, Profesor, Alumno).
- **Control Académico**: Gestión de cursos, horarios y notas.
- **Interfaz Intuitiva**: Diseño adaptativo y moderno basado en Angular Material.

---

## 🏗 Arquitectura del Proyecto

El sistema está dividido en dos grandes componentes desacoplados:

### [Frontend (Aplicación Cliente)](./frontend)

Desarrollado en **Angular**, proporciona la interfaz de usuario. Se comunica con el backend a través de una API RESTful.

- **Tecnologías**: Angular 16+, TypeScript, SCSS.

### [Backend (Servidor API)](./backend)

Desarrollado en **Node.js** con **Express**, gestiona la lógica de negocio y la persistencia de datos.

- **Tecnologías**: Node.js, Express, MongoDB (Mongoose), TypeScript.

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrese de tener instalado el siguiente software:

- [Node.js](https://nodejs.org/) (v18.x o superior recomendado)
- [npm](https://www.npmjs.com/) (Manejador de paquetes de Node)
- [MySQL](https://www.mysql.com/) (Base de datos relacional)
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)

---

## 🚀 Instalación y Puesta en Marcha

Para levantar el entorno completo de desarrollo, siga estos pasos:

1. **Clonar el repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd CampusHub
   ```

2. **Configurar el Backend**:
   Vaya a la carpeta `backend`, instale dependencias y configure las variables de entorno.
   _(Ver [README del Backend](./backend/README.md) para más detalles)_.

3. **Configurar el Frontend**:
   Vaya a la carpeta `frontend`, instale dependencias e inicie el servidor de desarrollo.
   _(Ver [README del Frontend](./frontend/README.md) para más detalles)_.

---

## 📂 Estructura del Repositorio

```plaintext
CampusHub/
├── backend/            # Código fuente del servidor (API)
├── frontend/           # Código fuente de la aplicación cliente (Angular)
├── Estructura.md       # Documento de arquitectura detallada
└── README.md           # Este archivo
```

---

## 👥 Equipo de Desarrollo

Este proyecto ha sido desarrollado con dedicación por nuestro equipo de ingeniería:

- **Integrante 1** - _Rol/Especialidad_
- **Integrante 2** - _Rol/Especialidad_
- **Integrante 3** - _Rol/Especialidad_
- **Integrante 4** - _Rol/Especialidad_

---

© 2024 CampusHub Team. Todos los derechos reservados.
