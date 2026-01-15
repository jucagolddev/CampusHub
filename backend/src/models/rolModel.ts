/**
 * ARCHIVO: models/rolModel.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * DAO para la entidad 'Rol'.
 * Gestiona los permisos y grupos de usuarios (ej. Admin, Profesor, Alumno).
 */

import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Role {
    id: number;
    nombreGrupo: string;
    permisos: string; // JSON o CSV de permisos
}

/**
 * Crea un nuevo rol.
 * Si se pasa un ID, intenta usarlo (útil para migración de datos con IDs fijos).
 * Si no, deja que la BD autoincremente.
 */
export async function createRol(id: number | null, nombreGrupo: string, permisos: string) {
  let sql;
  let params;

  if (id) {
    // Inserción forzada con ID
    sql = 'INSERT INTO ROL (id, nombreGrupo, permisos) VALUES (?, ?, ?)';
    params = [id, nombreGrupo, permisos];
  } else {
    // Autoincremental
    sql = 'INSERT INTO ROL (nombreGrupo, permisos) VALUES (?, ?)';
    params = [nombreGrupo, permisos];
  }

  const [result] = await pool.execute<ResultSetHeader>(sql, params);
  
  // Retornamos el ID usado
  return id || result.insertId;
}

/**
 * Obtiene lista de roles.
 */
export async function getRoles(): Promise<Role[]> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM ROL');
  return rows as Role[];
}

/**
 * Actualiza nombre o permisos de un rol.
 */
export async function updateRol(id: number, nombreGrupo: string, permisos: string) {
  await pool.execute(
    'UPDATE ROL SET nombreGrupo = ?, permisos = ? WHERE id = ?',
    [nombreGrupo, permisos, id]
  );
}

/**
 * Elimina un rol.
 */
export async function deleteRol(id: number) {
  await pool.execute('DELETE FROM ROL WHERE id = ?', [id]);
}
