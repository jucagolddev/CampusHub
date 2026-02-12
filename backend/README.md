# CampusHub API: Núcleo de Lógica y Persistencia

El backend de **CampusHub** es una API RESTful de alto rendimiento diseñada bajo los principios de modularidad y seguridad. El servidor gestiona la orquestación de datos entre la interfaz de usuario y la base de datos relacional, garantizando la integridad de cada transacción académica.

---

## 🛠️ Especificaciones Técnicas

- **Entorno de Ejecución**: Node.js (Ecosistema asíncrono y escalable).
- **Framework**: Express.js (Gestión de rutas y middlewares).
- **Lenguaje**: TypeScript (Tipado estricto para reducir errores en tiempo de ejecución).
- **Base de Datos**: MySQL (Modelo relacional normalizado).
- **Seguridad**: Implementación de JSON Web Tokens (JWT) para la gestión de sesiones.

---

## 🔐 Capas de Seguridad y Control

El sistema implementa una arquitectura de seguridad multinivel:

1. **Autenticación (JWT)**: Todos los endpoints sensibles requieren una firma válida emitida tras un login exitoso.
2. **Autorización (RBAC)**: Middlewares específicos validan si el usuario posee los roles necesarios (`Administrador`, `Profesor`, `Gestor`) para ejecutar acciones críticas.
3. **Cifrado de Datos**: Las credenciales de acceso se procesan mediante algoritmos de hashing antes de su persistencia.

---

## 📊 Modelo de Datos (MySQL)

La base de datos se estructura en torno a entidades clave:

- `Usuario`: Gestión de perfiles, credenciales y roles.
- `Proyecto`: Almacenamiento de metadatos de las creaciones publicadas.
- `Centro Educativo`: Catálogo de instituciones vinculadas.
- `Rol`: Definición de permisos y niveles de acceso.

---

## 🔌 Estructura de Endpoints Principal

### Autenticación

- `POST /api/auth/login`: Validación de credenciales y emisión de tokens.
- `POST /api/auth/register`: Creación de nuevas cuentas de usuario.

### Gestión de Contenido

- `GET /api/projects`: Recuperación del catálogo completo de proyectos.
- `POST /api/projects`: Publicación de nuevos trabajos (Requiere Auth).
- `DELETE /api/projects/:id`: Eliminación controlada de registros (Requiere Admin).

---

## 🚀 Manual de Despliegue Local

1. Instalar dependencias mediante `npm install`.
2. Configurar el archivo `.env` con las credenciales de MySQL y el `JWT_SECRET`.
3. Ejecutar los scripts SQL localizados en `/bbdd` para inicializar el esquema.
4. Iniciar el servidor en modo desarrollo: `npm run dev`.

---

2024 CampusHub &middot; Arquitectura de Backend para Entornos Universitarios.
