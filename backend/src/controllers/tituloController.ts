import { Request, Response } from "express";
import * as model from "../models/tituloModel.js";

/**
 * ==========================================
 * Controlador de Títulos Académicos
 * ==========================================
 * Gestionamos los grados o titulaciones (ej. "Ingeniería Informática").
 */

/** Registra un nuevo título en el sistema */
export async function create(req: Request, res: Response) {
  try {
    const id = await model.createTitulo(req.body.nombreTitulo);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear título" });
  }
}

/** Obtiene el catálogo completo de títulos */
export async function list(req: Request, res: Response) {
  try {
    res.json(await model.getTitulos());
  } catch (error) {
    res.status(500).json({ error: "Error al listar títulos" });
  }
}

/** Actualiza el nombre de un título */
export async function update(req: Request, res: Response) {
  try {
    await model.updateTitulo(Number(req.params.id), req.body.nombreTitulo);
    res.json({ message: "Título actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar título" });
  }
}

/** Elimina un título de la base de datos */
export async function remove(req: Request, res: Response) {
  try {
    await model.deleteTitulo(Number(req.params.id));
    res.json({ message: "Título eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar título" });
  }
}
