/**
 * CONFIGURACIÓN DE BASE DE DATOS (db.ts)
 * -------------------------------------------------------------------------
 * Este módulo orquesta la conexión entre la aplicación Node.js y el motor
 * de base de datos MySQL. Implementa el patrón "Connection Pool" para
 * gestionar eficientemente múltiples conexiones simultáneas.
 * 
 * La configuración es flexible y se adapta tanto a entornos locales (XAMPP)
 * como a entornos de producción mediante variables de entorno (.env).
 */

import mysql from 'mysql2/promise'; // Usamos la versión con Promesas para async/await
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

/**
 * CREACIÓN DEL POOL
 * Se definen los límites de la piscina para optimizar recursos del servidor.
 */
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',      // Usuario por defecto en XAMPP
    password: process.env.DB_PASS || '',      // Contraseña vacía por defecto en XAMPP
    database: process.env.DB_NAME || 'proyecto_integrado',
    waitForConnections: true,  // Si no hay conexiones libres, espera hasta que una se libere
    connectionLimit: 10,       // Máximo 10 conexiones simultáneas
    queueLimit: 0              // Cola de espera infinita
});

// Mensaje de diagnóstico en consola (Solo informativo, no bloqueante)
// Nota: El pool no se conecta hasta la primera query, por eso no hay un 'connect()' explícito aquí.
console.log(`[DB] Configuración de Pool cargada para la base de datos: ${process.env.DB_NAME || 'proyecto_integrado'}`);

export default pool;
