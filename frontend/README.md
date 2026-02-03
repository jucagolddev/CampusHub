# CampusHub - Frontend

Este directorio contiene la aplicación cliente de **CampusHub**, desarrollada con **Angular 16+**. Nuestra interfaz está diseñada para ser rápida, responsiva y estéticamente agradable.

---

## 🛠 Tecnologías Utilizadas

- **Core**: Angular (v16), TypeScript (v5.1).
- **Estilos**: SCSS (Sass) para estilos modulares y mantenibles.
- **Enrutamiento**: Angular Router.
- **Cliente HTTP**: Angular HttpClient.

---

## ⚙️ Configuración e Instalación

### 1. Prerrequisitos

Asegúrese de estar en el directorio `frontend/`:

```bash
cd frontend
```

### 2. Instalar Dependencias

Instalamos todas las librerías necesarias definidas en `package.json`:

```bash
npm install
```

---

## ▶️ Ejecución del Proyecto

### Servidor de Desarrollo

Para iniciar la aplicación en modo desarrollo con recarga automática:

```bash
npm start
# O alternativamente:
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`.

### Compilación para Producción

Para generar los archivos optimizados para despliegue:

```bash
npm run build
```

Los artefactos de compilación se almacenarán en el directorio `dist/campus-hub`.

### Tests Unitarios

Para ejecutar las pruebas unitarias con Karma/Jasmine:

```bash
npm run test
```

---

## 📂 Estructura del Proyecto Frontend

```plaintext
src/
├── app/
│   ├── layout/          # Componentes de estructura (Sidebar, Navbar, Footer)
│   ├── modules/         # Módulos funcionales (Auth, Dashboard, Usuarios)
│   ├── shared/          # Componentes y servicios reutilizables
│   ├── core/            # Servicios singleton y guardias
│   ├── app.component.ts # Componente raíz
│   └── app.module.ts    # Módulo raíz
├── assets/              # Imágenes, fuentes e iconos estáticos
├── environments/        # Variables de entorno (dev, prod)
├── styles/              # Estilos globales y mixins SCSS
├── index.html           # HTML base de la aplicación
└── main.ts              # Punto de entrada de la aplicación
```

---

## 📝 Guía de Estilos y Buenas Prácticas

- **Componentes**: Usamos la estrategia `OnPush` donde sea posible para mejorar el rendimiento.
- **Estilos**: Evitamos estilos globales innecesarios; preferimos encapsulación de componentes.
- **Tipado**: Utilizamos TypeScript en modo estricto (`strict: true`) para garantizar la robustez del código.

---

**CampusHub Frontend Team**
