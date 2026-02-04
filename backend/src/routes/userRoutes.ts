import express from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware, { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Rutas de Gestión de Usuarios.
 */

// URL: POST /api/users/register (Público)
router.post("/register", userController.register);

// URL: POST /api/users/login (Público)
router.post("/login", userController.login);

// URL: GET /api/users (Protegido: Solo Admin)
router.get("/", authMiddleware, isAdmin, userController.getUsers);

// URL: DELETE /api/users/:tokken (Protegido: Solo Admin)
router.delete("/:tokken", authMiddleware, isAdmin, userController.deleteUser);

// URL: PUT /api/users/:userToken/rol (Protegido: Solo Admin)
// Permite a un administrador asignar un rol a un usuario
router.put("/:userToken/rol", authMiddleware, isAdmin, userController.changeUserRole);

export default router;
