import { Request, Response } from "express";
import * as model from "../models/rolModel.js";

/**
 * ==========================================
 * Controlador de Roles de Usuario
 * ==========================================
 * Gestión de grupos de permisos (ej. Administrador, Profesor, Alumno).
 */

/** Crea un nuevo rol con sus permisos asociados */
export async function create(req: Request, res: Response) {
  try {
    const id = await model.createRol(req.body.nombreGrupo, req.body.permisos);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear rol" });
  }
}

/** Lista todos los roles disponibles */
export async function list(req: Request, res: Response) {
  try {
    res.json(await model.getRoles());
  } catch (error) {
    res.status(500).json({ error: "Error al listar roles" });
  }
}

/** Actualiza los datos y permisos de un rol */
export async function update(req: Request, res: Response) {
  try {
    await model.updateRol(
      Number(req.params.id),
      req.body.nombreGrupo,
      req.body.permisos
    );
    res.json({ message: "Rol actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar rol" });
  }
}

/** Elimina un rol del sistema */
export async function remove(req: Request, res: Response) {
  try {
    await model.deleteRol(Number(req.params.id));
    res.json({ message: "Rol eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar rol" });
  }
}
