/**
 * ARCHIVO: controllers/tituloController.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * C.R.U.D. para Títulos (ej. DAW, DAM).
 */

import { Request, Response } from 'express';
import * as model from '../models/tituloModel';

export async function create(req: Request, res: Response) {
  try {
    const { nombreTitulo } = req.body;
    if (!nombreTitulo) return res.status(400).json({ error: 'Nombre de título requerido' });

    const id = await model.createTitulo(nombreTitulo);
    res.status(201).json({ id, message: 'Título creado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const titulos = await model.getTitulos();
    res.json(titulos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await model.updateTitulo(id, req.body.nombreTitulo);
    res.json({ message: 'Título actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    await model.deleteTitulo(id);
    res.json({ message: 'Título eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}
