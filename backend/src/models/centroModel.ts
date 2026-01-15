/**
 * ARCHIVO: models/centroModel.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * DAO para la entidad 'Centro Educativo'.
 * Gestiona la lista de centros donde se imparten las FP.
 */

import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Interfaz CentroEducativo
 */
export interface CentroEducativo {
    id?: number;
    nombreCentro: string;
    sufijoEmail: string; // Ejemplo: '@iesplayamar.es'
}

/**
 * Crea un nuevo centro educativo.
 * @param nombreCentro Nombre del centro (ej. IES Playamar)
 * @param sufijoEmail Dominio de correo asociado (ej. @iesplayamar.es)
 */
export async function createCentro(nombreCentro: string, sufijoEmail: string) {
  const [r] = await pool.execute<ResultSetHeader>(
    'INSERT INTO CENTRO_EDUCATIVO (nombreCentro, sufijoEmail) VALUES (?, ?)',
    [nombreCentro, sufijoEmail]
  );
  return r.insertId;
}

/**
 * Obtiene todos los centros registrados.
 */
export async function getCentros(): Promise<CentroEducativo[]> {
  const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM CENTRO_EDUCATIVO');
  return rows as CentroEducativo[];
}

/**
 * Actualiza la información de un centro.
 */
export async function updateCentro(id: number, nombreCentro: string, sufijoEmail: string) {
  await pool.execute(
    'UPDATE CENTRO_EDUCATIVO SET nombreCentro = ?, sufijoEmail = ? WHERE id = ?',
    [nombreCentro, sufijoEmail, id]
  );
}

/**
 * Elimina un centro por su ID.
 */
export async function deleteCentro(id: number) {
  await pool.execute('DELETE FROM CENTRO_EDUCATIVO WHERE id = ?', [id]);
}
