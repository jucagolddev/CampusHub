/**
 * ARCHIVO: models/tituloModel.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * DAO para la entidad 'Título'.
 * Representa el nombre de la titulación (ej. DAW, DAM, ASIR).
 */

import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Titulo {
    id?: number;
    nombreTitulo: string;
}

/**
 * Crea un nuevo título académico.
 * @param nombreTitulo Nombre corto o largo del título (ej. "Desarrollo de Aplicaciones Web")
 */
export async function createTitulo(nombreTitulo: string) {
  const [r] = await pool.execute<ResultSetHeader>(
    'INSERT INTO TITULO (nombreTitulo) VALUES (?)',
    [nombreTitulo]
  );
  return r.insertId;
}

/**
 * Obtiene la lista de todos los títulos.
 */
export async function getTitulos(): Promise<Titulo[]> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM TITULO');
  return rows as Titulo[];
}

/**
 * Actualiza el nombre de un título.
 */
export async function updateTitulo(id: number, nombreTitulo: string) {
  await pool.execute(
    'UPDATE TITULO SET nombreTitulo = ? WHERE id = ?',
    [nombreTitulo, id]
  );
}

/**
 * Elimina un título del sistema.
 */
export async function deleteTitulo(id: number) {
  await pool.execute('DELETE FROM TITULO WHERE id = ?', [id]);
}
