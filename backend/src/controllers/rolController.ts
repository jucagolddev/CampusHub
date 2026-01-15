/**
 * ARCHIVO: controllers/rolController.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Lógica para la gestión de Roles.
 * Maneja errores de ID duplicado específicamente.
 */

import { Request, Response } from 'express';
import * as model from '../models/rolModel';

export async function create(req: Request, res: Response) {
    try {
        const { id, nombreGrupo, permisos } = req.body;

        if (!id && id !== 0) { // Si id es opcional, quitar esta validación. Asumimos requerido por ahora si el frontend lo manda.
             // Para ser flexible, permitimos que sea null y lo genere la BD
        }

        const newId = await model.createRol(id || null, nombreGrupo, permisos);
        
        res.status(201).json({ 
            message: 'Rol creado', 
            id: newId 
        });

    } catch (err: any) {
        if (err.code === 'ER_DUP_ENTRY') {
             res.status(409).json({ error: 'Ya existe un rol con ese ID' });
             return;
        }
        console.error(err);
        res.status(500).json({ error: 'Error al crear el rol' });
    }
}

export async function list(req: Request, res: Response) {
    res.json(await model.getRoles());
}

export async function update(req: Request, res: Response) {
    await model.updateRol(parseInt(req.params.id), req.body.nombreGrupo, req.body.permisos);
    res.json({ message: 'Actualizado' });
}

export async function remove(req: Request, res: Response) {
    await model.deleteRol(parseInt(req.params.id));
    res.json({ message: 'Eliminado' });
}
