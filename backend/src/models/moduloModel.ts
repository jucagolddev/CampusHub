/**
 * ARCHIVO: models/moduloModel.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * DAO para la entidad 'Módulo'.
 * Representa las asignaturas o materias (ej. "Programación", "Bases de Datos").
 */

import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface Modulo {
    id?: number;
    nombreModulo: string;
}

/**
 * Crea un nuevo módulo.
 */
export async function createModulo(nombreModulo: string) {
  const [r] = await pool.execute<ResultSetHeader>(
    'INSERT INTO MODULO (nombreModulo) VALUES (?)',
    [nombreModulo]
  );
  return r.insertId;
}

/**
 * Lista todos los módulos.
 */
export async function getModulos(): Promise<Modulo[]> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM MODULO');
  return rows as Modulo[];
}

/**
 * Actualiza el nombre de un módulo.
 */
export async function updateModulo(id: number, nombreModulo: string) {
  await pool.execute(
    'UPDATE MODULO SET nombreModulo = ? WHERE id = ?',
    [nombreModulo, id]
  );
}

/**
 * Elimina un módulo.
 */
export async function deleteModulo(id: number) {
  await pool.execute('DELETE FROM MODULO WHERE id = ?', [id]);
}
