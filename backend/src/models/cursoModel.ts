/**
 * ARCHIVO: models/cursoModel.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * DAO para la entidad 'Curso'.
 * Representa el año o nivel académico (ej. 1º, 2º).
 */

import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Curso {
    id?: number;
    numCurso: string | number; // Puede ser '1', '2' o '1º', '2º'
}

/**
 * Crea un nuevo curso.
 * @param numCurso El identificador del curso (ej. "1").
 */
export async function createCurso(numCurso: string | number) {
  const [r] = await pool.execute<ResultSetHeader>(
    'INSERT INTO CURSO (numCurso) VALUES (?)',
    [numCurso]
  );
  return r.insertId;
}

/**
 * Lista todos los cursos disponibles.
 */
export async function getCursos(): Promise<Curso[]> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM CURSO');
  return rows as Curso[];
}

/**
 * Actualiza el valor de un curso existente.
 */
export async function updateCurso(id: number, numCurso: string | number) {
  await pool.execute(
    'UPDATE CURSO SET numCurso = ? WHERE id = ?',
    [numCurso, id]
  );
}

/**
 * Elimina un curso.
 */
export async function deleteCurso(id: number) {
  await pool.execute('DELETE FROM CURSO WHERE id = ?', [id]);
}
