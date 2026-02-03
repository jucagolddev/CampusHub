import { Request, Response } from "express";
import * as model from "../models/centroModel.js";

/**
 * ==========================================
 * Controlador de Centros Educativos
 * ==========================================
 * Aquí gestionamos la lógica para crear, listar, editar y eliminar centros.
 * Un centro puede tener múltiples títulos asociados.
 */

/**
 * Registra un nuevo centro en la base de datos.
 * Espera `nombreCentro` y `sufijoEmail` en el cuerpo de la petición.
 */
export async function create(req: Request, res: Response) {
  try {
    const id = await model.createCentro(
      req.body.nombreCentro,
      req.body.sufijoEmail
    );
    res.status(201).json({ id });
  } catch (error) {
    console.error("Error al crear centro:", error);
    res.status(500).json({ error: "Error interno al crear el centro" });
  }
}

/**
 * Recupera el listado completo de centros.
 */
export async function list(req: Request, res: Response) {
  try {
    const centros = await model.getCentros();
    res.json(centros);
  } catch (error) {
    res.status(500).json({ error: "Error al listar centros" });
  }
}

/**
 * Actualiza la información de un centro existente.
 * El ID se recibe por parámetro en la URL.
 */
export async function update(req: Request, res: Response) {
  try {
    await model.updateCentro(
      Number(req.params.id),
      req.body.nombreCentro,
      req.body.sufijoEmail
    );
    res.json({ message: "Centro actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar centro" });
  }
}

/**
 * Elimina un centro del sistema.
 */
export async function remove(req: Request, res: Response) {
  try {
    await model.deleteCentro(Number(req.params.id));
    res.json({ message: "Centro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar centro" });
  }
}
