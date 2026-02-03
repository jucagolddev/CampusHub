import { Request, Response } from "express";
import * as model from "../models/moduloModel.js";

/**
 * ==========================================
 * Controlador de Módulos (Asignaturas)
 * ==========================================
 * Gestionamos los módulos que componen los cursos.
 * Manejan las peticiones HTTP y llaman al modelo correspondiente.
 */

/** Registra un nuevo módulo en la base de datos */
export async function create(req: Request, res: Response) {
  try {
    const id = await model.createModulo(req.body.nombreModulo);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear módulo" });
  }
}

/** Devuelve la lista completa de módulos */
export async function list(req: Request, res: Response) {
  try {
    res.json(await model.getModulos());
  } catch (error) {
    res.status(500).json({ error: "Error al listar módulos" });
  }
}

/** Actualiza el nombre de un módulo existente */
export async function update(req: Request, res: Response) {
  try {
    await model.updateModulo(Number(req.params.id), req.body.nombreModulo);
    res.json({ message: "Módulo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar módulo" });
  }
}

/** Elimina un módulo */
export async function remove(req: Request, res: Response) {
  try {
    await model.deleteModulo(Number(req.params.id));
    res.json({ message: "Módulo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar módulo" });
  }
}
