/**
 * RUTAS DE DATOS MAESTROS
 * Definición de endpoints para catálogos del sistema.
 */
import { Router } from 'express';
import * as masterDataController from '../controllers/masterDataController';

const router = Router();

// Rutas Públicas (o protegidas según necesidad, por ahora públicas para registro)
router.get('/roles', masterDataController.getRoles);
router.get('/centros', masterDataController.getCentros);
router.get('/titulos', masterDataController.getTitulos);

// Rutas Administrativas (Idealmente protegidas con middleware de auth)
router.post('/centros', masterDataController.createCentro);

export default router;
