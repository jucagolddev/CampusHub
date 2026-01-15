/**
 * ARCHIVO: routes/relationRoutes.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Define endpoints para gestionar relaciones M:N entre entidades.
 * Ejemplos: Asignar un módulo a un curso, asignar un rol a un usuario.
 * 
 * SEGURIDAD:
 * Todas estas rutas están protegidas por 'authMiddleware'.
 */

import { Router } from 'express';
import * as relationController from '../controllers/relationController';
import auth from '../middlewares/authMiddleware';

const router = Router();

// ==========================================
// RUTAS DE ASIGNACIÓN
// ==========================================

/**
 * POST /assign-project
 * Asigna un colaborador a un proyecto existente.
 */
router.post('/assign-project', auth, relationController.assignProjectToUser);

/**
 * GET /users/:tokken/projects
 * Obtiene los proyectos en los que participa un usuario específico.
 */
router.get('/users/:tokken/projects', auth, relationController.getProjectsByUser);

/**
 * POST /assign-rol-user
 * Asigna un rol a un usuario (Admin Only).
 */
router.post('/assign-rol-user', auth, relationController.assignRolToUser);

/**
 * POST /assign-titulo-centro
 * Vincula un título (grado) a un centro educativo.
 */
router.post('/assign-titulo-centro', auth, relationController.assignTituloToCentro);

/**
 * POST /assign-curso-titulo
 * Vincula un curso (año) a un título.
 */
router.post('/assign-curso-titulo', auth, relationController.assignCursoToTitulo);

/**
 * POST /assign-modulo-curso
 * Vincula una asignatura a un curso.
 */
router.post('/assign-modulo-curso', auth, relationController.assignModuloToCurso);

export default router;
