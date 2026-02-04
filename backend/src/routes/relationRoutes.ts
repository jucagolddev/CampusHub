import express from "express";
import * as relationController from "../controllers/relationController.js";
import authMiddleware, { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Rutas de Gestión de Relaciones N:M.
 * Todas estas rutas requieren privilegios de Administrador para ser modificadas.
 */

// Asignar proyecto a usuario
router.post("/assign-project", authMiddleware, isAdmin, relationController.assignProjectToUser);

// Desvincular proyecto de usuario
router.post("/remove-project", authMiddleware, isAdmin, relationController.removeProjectFromUser);

// Consultar proyectos de un usuario (solo accesible por admin o el propio usuario, por ahora solo admin para simplificar gestión profesional)
router.get(
  "/users/:tokken/projects",
  authMiddleware,
  isAdmin,
  relationController.getProjectsByUser
);

// Vincular Rol a Usuario (Ruta antigua, redirige o protege con isAdmin)
router.post("/assign-rol-user", authMiddleware, isAdmin, relationController.assignRolToUser);

// Desvincular Rol de Usuario
router.post("/remove-rol-user", authMiddleware, isAdmin, relationController.removeRolFromUser);

// Vincular Título a un Centro Educativo
router.post(
  "/assign-titulo-centro",
  authMiddleware,
  isAdmin,
  relationController.assignTituloToCentro
);

// Vincular Curso a un Título Académico
router.post(
  "/assign-curso-titulo",
  authMiddleware,
  isAdmin,
  relationController.assignCursoToTitulo
);

// Vincular Módulo a un Curso específico
router.post(
  "/assign-modulo-curso",
  authMiddleware,
  isAdmin,
  relationController.assignModuloToCurso
);

export default router;
