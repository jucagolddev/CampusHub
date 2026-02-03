import { Request, Response } from "express";
import * as model from "../models/cursoModel.js";

/**
 * ==========================================
 * Controlador de Cursos Académicos
 * ==========================================
 * Gestiona los cursos (ej. 1º, 2º) que pertenecen a un título.
 */

/**
 * Crea un nuevo curso.
 * Recibe `numCurso` (ej: 1, 2) en el body.
 */
export async function create(req: Request, res: Response) {
  try {
    const id = await model.createCurso(req.body.numCurso);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear curso" });
  }
}

/**
 * Obtiene todos los cursos disponibles.
 */
export async function list(req: Request, res: Response) {
  try {
    const cursos = await model.getCursos();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar cursos" });
  }
}

/**
 * Modifica un curso existente.
 */
export async function update(req: Request, res: Response) {
  try {
    await model.updateCurso(Number(req.params.id), req.body.numCurso);
    res.json({ message: "Curso actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar curso" });
  }
}

/**
 * Elimina un curso.
 */
export async function remove(req: Request, res: Response) {
  try {
    await model.deleteCurso(Number(req.params.id));
    res.json({ message: "Curso eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar curso" });
  }
}
