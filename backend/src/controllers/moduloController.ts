/**
 * ARCHIVO: controllers/moduloController.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Lógica para la gestión de Módulos (Asignaturas).
 */

import { Request, Response } from 'express';
import * as model from '../models/moduloModel';

export async function create(req: Request, res: Response) {
  const id = await model.createModulo(req.body.nombreModulo);
  res.status(201).json({ id });
}

export async function list(req: Request, res: Response) {
  res.json(await model.getModulos());
}

export async function update(req: Request, res: Response) {
  await model.updateModulo(parseInt(req.params.id), req.body.nombreModulo);
  res.json({ message: 'Módulo actualizado' });
}

export async function remove(req: Request, res: Response) {
  await model.deleteModulo(parseInt(req.params.id));
  res.json({ message: 'Módulo eliminado' });
}
