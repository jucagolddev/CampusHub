/**
 * ARCHIVO: controllers/centroController.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Controlador para la entidad 'Centro Educativo'.
 * Gestiona las operaciones básicas de ABM (Alta, Baja, Modificación) y Listado.
 */

import { Request, Response } from 'express';
import * as model from '../models/centroModel';

/**
 * Crea un nuevo centro educativo.
 * Recibe: nombreCentro, sufijoEmail.
 */
export async function create(req: Request, res: Response) {
  try {
    const { nombreCentro, sufijoEmail } = req.body;
    
    // Validación básica
    if (!nombreCentro || !sufijoEmail) {
        return res.status(400).json({ error: 'Faltan parámetros requeridos (nombreCentro, sufijoEmail)' });
    }

    const id = await model.createCentro(nombreCentro, sufijoEmail);
    res.status(201).json({ 
        message: 'Centro creado correctamente', 
        id 
    });
  } catch (err) {
    console.error('[ERROR CREATE CENTRO]', err);
    res.status(500).json({ error: 'Error interno al crear centro' });
  }
}

/**
 * Obtiene la lista de todos los centros.
 */
export async function list(req: Request, res: Response) {
  try {
    const centros = await model.getCentros();
    res.json(centros);
  } catch (err) {
    console.error('[ERROR LIST CENTRO]', err);
    res.status(500).json({ error: 'Error al listar centros' });
  }
}

/**
 * Actualiza la información de un centro existente.
 */
export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { nombreCentro, sufijoEmail } = req.body;

    await model.updateCentro(id, nombreCentro, sufijoEmail);
    res.json({ message: 'Centro actualizado correctamente' });
  } catch (err) {
    console.error('[ERROR UPDATE CENTRO]', err);
    res.status(500).json({ error: 'Error al actualizar centro' });
  }
}

/**
 * Elimina (físicamente) un centro de la base de datos.
 * NOTA: Cuidado con la integridad referencial. Si hay usuarios asignados a este centro, podría fallar.
 */
export async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await model.deleteCentro(id);
    res.json({ message: 'Centro eliminado correctamente' });
  } catch (err) {
    console.error('[ERROR DELETE CENTRO]', err);
    res.status(500).json({ error: 'Error al eliminar centro (posible conflicto de llaves foráneas)' });
  }
}
