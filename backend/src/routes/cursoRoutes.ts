/**
 * ARCHIVO: routes/cursoRoutes.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Endpoints CRUD para la entidad 'Curso'.
 * Ruta Base: /api/cursos
 */

import { Router } from 'express';
import * as cursoController from '../controllers/cursoController';

const router = Router();

router.post('/', cursoController.create);
router.get('/', cursoController.list);
router.put('/:id', cursoController.update);
router.delete('/:id', cursoController.remove);

export default router;
