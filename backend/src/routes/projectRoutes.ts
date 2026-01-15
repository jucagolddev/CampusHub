/**
 * DEFINICIÓN DE RUTAS DE PROYECTOS (projectRoutes.ts)
 * -------------------------------------------------------------------------
 * Este archivo define los puntos de entrada (endpoints) para la gestión
 * de proyectos en la API. Organiza la accesibilidad mediante el uso de
 * middlewares de autenticación para proteger las acciones de escritura.
 * 
 * Rutas Finales: /api/projects/
 */

import { Router } from 'express';
import * as projectController from '../controllers/projectController';
import auth from '../middlewares/authMiddleware'; 

const router = Router();

// ==========================================
// RUTAS
// ==========================================

/**
 * POST /
 * Middleware: auth (Requiere Token)
 * Descripción: Crea un nuevo proyecto vinculado al usuario autenticado.
 */
router.post('/', auth, projectController.createProject);

/**
 * GET /
 * Middleware: Ninguno (Público)
 * Descripción: Devuelve la lista de proyectos públicos.
 */
router.get('/', projectController.listProjects);

/**
 * GET /:id
 * Middleware: Ninguno (Público)
 * Descripción: Obtiene el detalle de un proyecto específico.
 */
router.get('/:id', projectController.getProjectById);

/**
 * PUT /:id
 * Middleware: auth (Requiere Token)
 * Descripción: Actualiza un proyecto existente.
 * Validación: El controlador debe verificar que el usuario sea el dueño del proyecto.
 */
router.put('/:id', auth, projectController.updateProject);

export default router;
