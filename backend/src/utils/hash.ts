/**
 * ARCHIVO: utils/hash.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Módulo de utilidades criptográficas.
 * Se encarga de hashear (cifrar) contraseñas antes de guardarlas en BD
 * y de comparar contraseñas en texto plano contra hashes guardados.
 *
 * TECNOLOGÍA:
 * Usa 'bcrypt' que es el estándar industrial para seguridad de contraseñas.
 */

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Factor de coste para el algoritmo (balance entre seguridad y rendimiento)

/**
 * Genera un hash seguro a partir de una contraseña en texto plano.
 * @param password Contraseña original del usuario.
 * @returns Promesa con el string del hash.
 */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compara una contraseña en texto plano con un hash almacenado.
 * @param password Contraseña ingresada por el usuario (Login).
 * @param hash Hash recuperado de la base de datos.
 * @returns Promesa con true si coinciden, false si no.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
