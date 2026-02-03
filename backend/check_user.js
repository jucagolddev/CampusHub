import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

async function createUser() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyecto_integrado",
    port: 3306,
  });

  try {
    const email = "juancarlosdorado.24@campuscamara.es";
    const userName = "Juan Carlos";
    const password = "PasswordHub24!"; // Temporary password for the user
    const hashed = await bcrypt.hash(password, 10);
    const tokken = "juancarlos-admin-uuid";
    const fecCreacion = new Date();

    // await connection.execute(
    //   "INSERT INTO usuario (tokken, userName, passwrd, email, fecCreacion) VALUES (?, ?, ?, ?, ?)",
    //   [tokken, userName, hashed, email, fecCreacion],
    // );

    // Assign admin role (ID 1)
    // await connection.execute(
    //   "INSERT INTO rol_usuario (tokken, rolId) VALUES (?, ?)",
    //   [tokken, 1],
    // );

    console.log(
      `User ${email} created successfully with password: ${password}`,
    );
    // Verify users
    const [users] = await connection.execute("SELECT * FROM usuario");
    console.log("Users in DB:", users);

    const [roles] = await connection.execute(
      "SELECT r.nombreGrupo FROM rol r JOIN rol_usuario ru ON r.id = ru.rolId",
    );
    console.log("Roles assigned:", roles);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.end();
  }
}

createUser();
