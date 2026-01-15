/**
 * ARCHIVO: routes/centroRoutes.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Endpoints CRUD para la entidad 'Centro Educativo'.
 * Ruta Base: /api/centros
 */

import { Router } from 'express';
import * as centroController from '../controllers/centroController';

const router = Router();

// crear
router.post('/', centroController.create);

// listar
router.get('/', centroController.list);

// actualizar
router.put('/:id', centroController.update);

// eliminar
router.delete('/:id', centroController.remove);

export default router;
