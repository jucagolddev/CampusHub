/**
 * CONTROLADOR DE DATOS MAESTROS
 * Gestiona la recuperación de catálogos (Roles, Centros, Títulos)
 * y el registro de nuevos centros educativos.
 */
import { Request, Response } from 'express';
import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Obtener lista de Roles disponibles
 */
export async function getRoles(req: Request, res: Response) {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM rol');
        res.json(rows);
    } catch (error) {
        console.error('[GET ROLES]', error);
        res.status(500).json({ error: 'Error al obtener roles' });
    }
}

/**
 * Obtener lista de Centros Educativos
 */
export async function getCentros(req: Request, res: Response) {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM centro_educativo');
        res.json(rows);
    } catch (error) {
        console.error('[GET CENTROS]', error);
        res.status(500).json({ error: 'Error al obtener centros' });
    }
}

/**
 * Obtener lista de Títulos
 */
export async function getTitulos(req: Request, res: Response) {
    try {
        const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM titulo');
        res.json(rows);
    } catch (error) {
        console.error('[GET TITULOS]', error);
        res.status(500).json({ error: 'Error al obtener títulos' });
    }
}

/**
 * Registrar un nuevo Centro Educativo
 */
export async function createCentro(req: Request, res: Response) {
    try {
        const { nombreCentro, sufijoEmail } = req.body;

        if (!nombreCentro) {
            return res.status(400).json({ error: 'El nombre del centro es obligatorio' });
        }

        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO centro_educativo (nombreCentro, sufijoEmail) VALUES (?, ?)',
            [nombreCentro, sufijoEmail || null]
        );

        res.status(201).json({ 
            message: 'Centro creado exitosamente',
            id: result.insertId,
            nombreCentro,
            sufijoEmail
        });

    } catch (error: any) {
        console.error('[CREATE CENTRO]', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Ya existe un centro con ese nombre' });
        }
        res.status(500).json({ error: 'Error al crear centro' });
    }
}
