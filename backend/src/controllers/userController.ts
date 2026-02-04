import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { hashPassword, comparePassword } from "../utils/hash.js";
import * as userModel from "../models/userModel.js";

/**
 * Controladores para la gestión de usuarios (Registro y Autenticación).
 */

/**
 * Registra un nuevo usuario.
 * Proceso:
 * 1. Valida campos obligatorios.
 * 2. Verifica si el usuario ya existe.
 * 3. Hashea la contraseña.
 * 4. Genera un token UUID único (sesión permanente).
 * 5. Guarda en DB.
 */
export async function register(req: Request, res: Response) {
  try {
    const { userName, password, email } = req.body;

    // Validación básica de entrada
    if (!userName || !password || !email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Comprobamos duplicados para evitar errores de clave única en la DB
    const existing = await userModel.findUserByUsername(userName);
    if (existing) {
      return res
        .status(409)
        .json({ error: "El nombre de usuario ya está registrado" });
    }

    // Seguridad: Nunca guardar contraseñas en texto plano
    const hashed = await hashPassword(password);

    // Generamos el ID de sesión (token) que usará el frontend
    const tokken = uuidv4();

    // Persistencia en base de datos
    await userModel.createUser({ tokken, userName, passwrd: hashed, email });

    // Devolvemos los datos (excepto la contraseña)
    return res.status(201).json({ tokken, userName, email });
  } catch (err) {
    console.error("Error en registro:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

/**
 * Autentica un usuario existente.
 * Proceso:
 * 1. Busca el usuario por nombre.
 * 2. Compara el hash de la contraseña.
 * 3. Si es correcto, devuelve el token UUID para futuras peticiones.
 */
export async function login(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;

    const user = await userModel.findUserByUsername(userName);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificamos la contraseña con la utilidad segura
    const ok = await comparePassword(password, user.passwrd);
    if (!ok) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Login exitoso: El frontend guardará este token para autorizar sus llamadas
    if (user) {
      const roles = await userModel.getRolesByUserToken(user.tokken);
      
      return res.json({
        message: "Login exitoso",
        token: user.tokken,
        user: {
          userName: user.userName,
          email: user.email,
          roles: roles // Array de roles
        },
      });
    }
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

/**
 * Obtiene la lista de todos los usuarios con sus roles.
 */
export async function getUsers(req: Request, res: Response) {
  try {
    const usersWithRoles = await userModel.getAllUsersWithRoles();
    return res.json(usersWithRoles);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    return res.status(500).json({ error: "Error al listar usuarios" });
  }
}

/**
 * Elimina un usuario.
 */
export async function deleteUser(req: Request, res: Response) {
  try {
    const { tokken } = req.params;

    if (!tokken) {
      return res.status(400).json({ error: "Token de usuario requerido" });
    }

    await userModel.deleteUserByTokken(tokken);
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    return res.status(500).json({ error: "Error al eliminar usuario" });
  }
}

/**
 * Asigna un nuevo rol a un usuario.
 * Solo accesible por Administradores (vía middleware).
 */
export async function changeUserRole(req: Request, res: Response) {
  try {
    const { userToken } = req.params;
    const { rolId } = req.body;

    if (!userToken || !rolId) {
      return res.status(400).json({ error: "Token de usuario y ID de rol son requeridos" });
    }

    // Verificamos si el usuario existe antes de intentar asignar el rol
    const user = await userModel.findUserByTokken(userToken);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await userModel.addRoleToUser(userToken, Number(rolId));

    return res.status(200).json({ 
      message: "Rol asignado correctamente",
      userToken,
      rolId 
    });
  } catch (err) {
    console.error("Error al asignar rol:", err);
    return res.status(500).json({ error: "Error interno al asignar el rol" });
  }
}
