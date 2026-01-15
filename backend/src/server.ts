/**
 * ARCHIVO: server.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Este es el punto de entrada principal (Entry Point) para el servidor Backend de CampusHub.
 * Su responsabilidad es inicializar la aplicación Express, configurar los middlewares esenciales
 * (como CORS y parser JSON) y definir las rutas principales de la API.
 *
 * FLUJO DE EJECUCIÓN:
 * 1. Carga de variables de entorno (.env).
 * 2. Inicialización de la app Express.
 * 3. Configuración de Middlewares (Seguridad y Datos).
 * 4. Montaje de Rutas (Endpoints).
 * 5. Arranque del servidor HTTP.
 */

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// IMPORTACIÓN DE RUTAS
// Estas rutas separan la lógica por dominios (Usuarios, Proyectos, etc.)
// para mantener el código modular y mantenible.
// NOTA: Asegurarse de que estos archivos existan en la carpeta de destino.
import userRoutes from './routes/userRoutes';
import projectRoutes from './routes/projectRoutes';
import masterDataRoutes from './routes/masterDataRoutes';
import indexRoutes from './routes/index';

// 1. CARGA DE CONFIGURACIÓN
// dotenv lee el archivo .env en la raíz y carga las variables en process.env.
// Esto es CRÍTICO para mantener credenciales fuera del código fuente.
dotenv.config();

// 2. INICIALIZACIÓN DE LA APP
const app: Application = express();

// 3. MIDDLEWARES GLOBALES
/**
 * CORS (Cross-Origin Resource Sharing):
 * Permite que nuestro Frontend (que corre en otro puerto/dominio) pueda hacer peticiones
 * a este Backend. Sin esto, el navegador bloquearía las peticiones.
 */
app.use(cors());

/**
 * BODY PARSER (express.json):
 * Permite que el servidor entienda peticiones con cuerpo JSON (Content-Type: application/json).
 * Transforma el raw body en un objeto JavaScript accesible en req.body.
 */
app.use(express.json());

// 4. DEFINICIÓN DE RUTAS (ENDPOINTS)

// Rutas de Usuarios (Autenticación, Perfil, etc.)
// Prefijo: /api/users
app.use('/api/users', userRoutes);

// Rutas de Proyectos (Crear, Listar, Subir, etc.)
// Prefijo: /api/projects
app.use('/api/projects', projectRoutes);

// Rutas de Datos Maestros (Roles, Centros, Títulos)
// Prefijo: /api
app.use('/api', masterDataRoutes);

// Rutas Generales / Índice
// Prefijo: /api
app.use('/api', indexRoutes);

/**
 * RUTA RAÍZ DE VERIFICACIÓN (Health Check)
 * Útil para saber rápidamente si el servidor está respondiendo sin ejecutar lógica compleja.
 */
app.get('/', (req: Request, res: Response) => {
  res.send('API CampusHub funcionando correctamente - Estado: ACTIVO');
});

// 5. ARRANQUE DEL SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
    ==================================================
    🚀 SERVIDOR CAMPUSHUB INICIADO
    ==================================================
    📡 URL:    http://localhost:${PORT}
    📅 FECHA:  ${new Date().toLocaleString()}
    ==================================================
    `);
});
