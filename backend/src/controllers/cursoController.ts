/**
 * ARCHIVO: controllers/cursoController.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Controlador para la entidad 'Curso'.
 * Gestiona los niveles disponibles (1, 2, etc.).
 */

import { Request, Response } from 'express';
import * as model from '../models/cursoModel';

/**
 * Crea un nuevo curso.
 */
export async function create(req: Request, res: Response) {
  try {
    const { numCurso } = req.body;
    if (!numCurso) return res.status(400).json({ error: 'Faltan parámetros' });

    const id = await model.createCurso(numCurso);
    res.status(201).json({ id, message: 'Curso creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

/**
 * Lista cursos.
 */
export async function list(req: Request, res: Response) {
  try {
    const cursos = await model.getCursos();
    res.json(cursos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

/**
 * Actualiza curso.
 */
export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await model.updateCurso(id, req.body.numCurso);
    res.json({ message: 'Curso actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

/**
 * Elimina curso.
 */
export async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await model.deleteCurso(id);
    res.json({ message: 'Curso eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}
