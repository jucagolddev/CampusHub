/**
 * ARCHIVO: routes/tituloRoutes.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Endpoints CRUD para la entidad 'Título'.
 * Ruta Base: /api/titulos
 */

import { Router } from 'express';
import * as tituloController from '../controllers/tituloController';

const router = Router();

router.post('/', tituloController.create);
router.get('/', tituloController.list);
router.put('/:id', tituloController.update);
router.delete('/:id', tituloController.remove);

export default router;
