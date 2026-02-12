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

2024 CampusHub &middot; Interfaz de Usuario para Plataformas Universitarias.
