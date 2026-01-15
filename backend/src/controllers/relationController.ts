/**
 * ARCHIVO: controllers/relationController.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Controlador central para gestionar relaciones entre entidades (Tablas pivote/intermedias).
 * Contiene lógica crítica de negocio como:
 * - Verificar que solo el creador añada colaboradores.
 * - Verificar que solo Admins asignen roles.
 */

import { Request, Response } from 'express';
import pool from '../config/db';
import { RowDataPacket } from 'mysql2';
// Importamos AuthRequest desde middlewares (plural)
import { AuthRequest } from '../middlewares/authMiddleware';

// -------------------- PROYECTO <-> USUARIO --------------------

/**
 * Asigna un usuario como colaborador a un proyecto.
 * Solo puede hacerlo el Creador del proyecto.
 */
export async function assignProjectToUser(req: AuthRequest, res: Response) {
  try {
    const { tokken, proyectoId } = req.body;
    
    // Usuario autenticado (quien hace la petición)
    const requesterTokken = req.user!.tokken; 

    // 1. Validar permiso: ¿Es el dueño?
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT creadorProyecto FROM USUARIO_PROYECTO WHERE tokken = ? AND proyectoId = ?',
      [requesterTokken, proyectoId]
    );

    if (rows.length === 0 || rows[0].creadorProyecto !== 1) {
        return res.status(403).json({ 
            error: 'Permiso DENEGADO. Solo el creador del proyecto puede añadir colaboradores.' 
        });
    }

    // 2. Insertar relación (como colaborador, false/0)
    await pool.execute(
      'INSERT INTO USUARIO_PROYECTO (tokken, proyectoId, creadorProyecto) VALUES (?, ?, ?)',
      [tokken, proyectoId, 0] 
    );

    res.status(201).json({ message: 'Colaborador asignado correctamente al proyecto' });

  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El usuario ya está asignado a este proyecto.' });
    }
    console.error('[ERROR ASSIGN PROJECT]', err);
    res.status(500).json({ error: 'Error interno al asignar usuario' });
  }
}

/**
 * Obtiene los proyectos de un usuario dado su Token.
 */
export async function getProjectsByUser(req: Request, res: Response) {
  try {
    const { tokken } = req.params;
    const [rows] = await pool.execute(
      `SELECT p.* 
       FROM PROYECTO p 
       JOIN USUARIO_PROYECTO up ON p.id = up.proyectoId 
       WHERE up.tokken = ?`,
      [tokken]
    );
    res.json(rows);
  } catch (err) {
    console.error('[ERROR GET PROJECTS]', err);
    res.status(500).json({ error: 'Error interno al obtener proyectos' });
  }
}

// -------------------- ROL <-> USUARIO --------------------

/**
 * Asigna un Rol a un Usuario.
 * Solo permitido para Administradores (Rol ID 3).
 */
export async function assignRolToUser(req: AuthRequest, res: Response) {
  try {
    // 1. Verificación de Seguridad (Admin Check)
    const adminUser = req.user!; 
    
    // Hardcoded ID 3 para Admin, idealmente esto debería ser una constante o ENUM
    if (adminUser.rolId !== 3) {
        return res.status(403).json({ 
            error: 'Permiso DENEGADO. Solo los administradores pueden gestionar roles.' 
        });
    }

    const { rolId, tokken } = req.body;
    if (!rolId || !tokken) {
        return res.status(400).json({ error: 'Faltan datos (rolId, tokken).' });
    }

    // 2. Limpieza de roles previos (Regla de negocio: 1 usuario = 1 rol activo)
    await pool.execute('DELETE FROM rol_usuario WHERE tokken = ?', [tokken]);

    // 3. Asignación nueva
    await pool.execute(
      'INSERT INTO rol_usuario (rolId, tokken) VALUES (?, ?)',
      [rolId, tokken]
    );

    res.status(200).json({ message: 'Rol asignado correctamente' });

  } catch (err) {
    console.error('[ERROR ASSIGN ROL]', err);
    res.status(500).json({ error: 'Error interno al asignar rol' });
  }
}

// -------------------- OTRAS ASIGNACIONES (Configuración Académica) --------------------

export async function assignTituloToCentro(req: Request, res: Response) {
  try {
    const { centroId, tituloId } = req.body;
    await pool.execute('INSERT INTO CENTRO_TITULO (centroId, tituloId) VALUES (?, ?)', [centroId, tituloId]);
    res.json({ message: 'Título asignado a Centro correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function assignCursoToTitulo(req: Request, res: Response) {
  try {
    const { tituloId, cursoId } = req.body;
    await pool.execute('INSERT INTO TITULO_CURSO (tituloId, cursoId) VALUES (?, ?)', [tituloId, cursoId]);
    res.json({ message: 'Curso asignado a Título correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}

export async function assignModuloToCurso(req: Request, res: Response) {
  try {
    const { cursoId, moduloId } = req.body;
    await pool.execute('INSERT INTO CURSO_MODULO (cursoId, moduloId) VALUES (?, ?)', [cursoId, moduloId]);
    res.json({ message: 'Módulo asignado a Curso correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno' });
  }
}
