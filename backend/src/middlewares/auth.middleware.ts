/**
 * ARCHIVO: auth.middleware.ts
 *
 * DESCRIPCIÓN:
 * Es el "segurata". Se pone antes de las rutas privadas y verifica si la
 * petición trae un Token válido. Si no, bloquea el paso.
 *
 * LO QUE HAY QUE CODIFICAR:
 * - Middleware que verifique el header Authorization.
 * - Validar token JWT.
 * - Añadir usuario al request si es válido.
 */
