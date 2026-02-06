import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

/**
 * Script de Utilidad: Gestión y Verificación de Usuarios.
 * Este archivo nos permite realizar tareas de mantenimiento directamente en la base de datos,
 * como crear usuarios administradores manualmente o verificar el estado de las tablas de forma rápida.
 */

async function createUser() {
  // Establecemos nuestra conexión local con el servidor MySQL (XAMPP)
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyecto_integrado",
    port: 3306,
  });

  try {
    // Definimos los datos del usuario que queremos gestionar o verificar
    const email = "juancarlosdorado.24@campuscamara.es";
    const userName = "Juan Carlos";
    const password = "PasswordHub24!"; // Contraseña temporal para el acceso inicial
    const hashed = await bcrypt.hash(password, 10); // Aplicamos un hash seguro a la contraseña
    const tokken = "juancarlos-admin-uuid"; // Generamos un token manual para este usuario
    const fecCreacion = new Date();

    /**
     * BLOQUE DE CREACIÓN MANUAL
     * Descomenta estas líneas si necesitas insertar el usuario de nuevo en la base de datos.
     * Nosotros lo mantenemos comentado para evitar intentos de inserción duplicada.
     */
    // await connection.execute(
    //   "INSERT INTO usuario (tokken, userName, passwrd, email, fecCreacion) VALUES (?, ?, ?, ?, ?)",
    //   [tokken, userName, hashed, email, fecCreacion],
    // );

    // Asignamos el rol de Administrador (ID 1) al usuario correspondiente
    // await connection.execute(
    //   "INSERT INTO rol_usuario (tokken, rolId) VALUES (?, ?)",
    //   [tokken, 1],
    // );

    console.log(
      `Procesando usuario: ${email}. Contraseña teórica: ${password}`,
    );

    // Fase de Verificación: Consultamos el estado actual de los usuarios en la DB
    const [users] = await connection.execute("SELECT userName, email, tokken FROM usuario");
    console.log("Listado de usuarios registrados:", users);

    // Fase de Verificación: Consultamos qué roles están asignados actualmente
    const [roles] = await connection.execute(
      "SELECT r.nombreGrupo, ru.tokken FROM rol r JOIN rol_usuario ru ON r.id = ru.rolId",
    );
    console.log("Asignaciones de roles actuales:", roles);

  } catch (err) {
    console.error("Ha ocurrido un error durante la ejecución del script:", err);
  } finally {
    // Cerramos la conexión para liberar los recursos de la base de datos
    await connection.end();
  }
}

// Iniciamos el proceso de utilidad
createUser();
