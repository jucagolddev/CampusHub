/**
 * MODELO DE USUARIO (userModel.ts)
 * -------------------------------------------------------------------------
 * Capa de Acceso a Datos (DAO) para la entidad de usuarios.
 * Proporciona una interfaz limpia y segura para realizar operaciones CRUD
 * sobre la tabla 'USUARIO' de MySQL.
 * 
 * Implementa el uso de parámetros preparados para prevenir inyecciones SQL
 * y maneja las promesas de la base de datos de forma asíncrona.
 */

import pool from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

/**
 * Interfaz IUser
 * Define la estructura de un objeto Usuario en la aplicación para TypeScript.
 */
export interface User {
    tokken: string;     // ID único del usuario (UUID)
    userName: string;   // Nombre de visualización
    passwrd?: string;   // Contraseña hasheada (Opcional al retornar datos al cliente)
    email: string;      // Correo electrónico único
    fecCreacion?: Date; // Fecha de registro
    rolId?: number;     // ID del Rol asignado (si aplica)
}

/**
 * Crea un nuevo usuario en la base de datos.
 * @param userData Objeto con tokken, userName, passwrd, email.
 * @returns Objeto con los datos guardados.
 */
/**
 * Crea un nuevo usuario en la base de datos.
 * Ahora soporta transacciones para vincular Rol y Datos Académicos.
 * @param userData Objeto con tokken, userName, passwrd, email, rolId, centroId, tituloId.
 * @returns Objeto con los datos guardados.
 */
export async function createUser(userData: { 
    tokken: string, 
    userName: string, 
    passwrd: string, 
    email: string,
    rolId?: number,
    centroId?: number,
    tituloId?: number
}) {
    const { tokken, userName, passwrd, email, rolId, centroId, tituloId } = userData;
    const fecCreacion = new Date();
    
    // Obtenemos una conexión del pool para manejar la transacción
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // 1. Insertar Usuario Base
        const sqlUser = 'INSERT INTO USUARIO (tokken, userName, passwrd, email, fecCreacion) VALUES (?, ?, ?, ?, ?)';
        await connection.execute(sqlUser, [tokken, userName, passwrd, email, fecCreacion]);

        // 2. Vincular Rol (si se proporciona)
        if (rolId) {
            const sqlRol = 'INSERT INTO rol_usuario (rolId, tokken) VALUES (?, ?)';
            await connection.execute(sqlRol, [rolId, tokken]);
        }

        // 3. Vincular Datos Académicos (Centro y Título)
        // Se asume que ambos vienen juntos si es una registro académico
        if (centroId && tituloId) {
            const sqlAcad = 'INSERT INTO usuario_academico (tokken, centroId, tituloId) VALUES (?, ?, ?)';
            await connection.execute(sqlAcad, [tokken, centroId, tituloId]);
        }

        // Confirmar transacción
        await connection.commit();
        
        return { tokken, userName, email, fecCreacion, rolId, centroId, tituloId };

    } catch (error) {
        // Revertir cambios en caso de error
        await connection.rollback();
        throw error;
    } finally {
        // Liberar conexión
        connection.release();
    }
}

/**
 * Busca un usuario por su nombre de usuario (para login).
 * @param userName Nombre de usuario a buscar.
 * @returns El objeto Usuario si existe, o undefined.
 */
export async function findUserByUsername(userName: string): Promise<User | undefined> {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM USUARIO WHERE userName = ?', [userName]);
    return rows[0] as User;
}

/**
 * Busca un usuario por su Token/ID.
 * También recupera el Rol asociado haciendo un JOIN.
 * @param tokken ID único del usuario.
 * @returns Usuario con su Rol.
 */
export async function findUserByTokken(tokken: string): Promise<User | undefined> {
  // Hacemos un LEFT JOIN con 'rol_usuario' para obtener el 'rolId' si existe relación
  const sql = `
    SELECT u.*, ru.rolId 
    FROM USUARIO u
    LEFT JOIN rol_usuario ru ON u.tokken = ru.tokken
    WHERE u.tokken = ?
  `;
  
  const [rows] = await pool.execute<RowDataPacket[]>(sql, [tokken]);
  return rows[0] as User;
}
