/**
 * ARCHIVO: routes/moduloRoutes.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * CRUD Base para Módulos (Asignaturas).
 * Ruta Base: /api/modulos
 */

import { Router } from 'express';
import * as c from '../controllers/moduloController';

const router = Router();

router.post('/', c.create);
router.get('/', c.list);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

export default router;
