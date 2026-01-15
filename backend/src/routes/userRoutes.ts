/**
 * ARCHIVO: routes/userRoutes.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Define los endpoints relacionados con la gestión de usuarios.
 * Principalmente se encarga de la Autenticación (Login/Registro).
 *
 * ENDPOINTS:
 * - POST /register: Crea un nuevo usuario.
 * - POST /login: Valida credenciales y devuelve un Token JWT.
 */

import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// ==========================================
// RUTAS PÚBLICAS
// ==========================================

/**
 * POST /register
 * Descripción: Recibe datos de usuario (nombre, email, password) y lo registra en BD.
 */
router.post('/register', userController.register);

/**
 * POST /login
 * Descripción: Recibe credenciales (email, password), las verifica contra hash
 * y devuelve un JWT si son válidas.
 */
router.post('/login', userController.login);

export default router;
