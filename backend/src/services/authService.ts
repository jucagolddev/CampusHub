import { v4 as uuidv4 } from "uuid";
import { hashPassword, comparePassword } from "../utils/hash.js";
import * as userModel from "../models/userModel.js";

/**
 * Servicio de Autenticación y Gestión de Usuarios.
 * En esta capa centralizamos toda la lógica de negocio para asegurar que sea
 * robusta, reutilizable y fácil de mantener.
 */

/**
 * Gestiona el registro de un nuevo usuario en el sistema.
 * Realiza las comprobaciones de seguridad y orquestación con el modelo.
 */
export async function registerUser(userName: string, password: string, email: string) {
  // Comprobamos si el usuario ya existe para evitar duplicados indeseados
  const existing = await userModel.findUserByUsername(userName);
  if (existing) {
    throw { status: 409, message: "El nombre de usuario ya está registrado" };
  }

  // Seguridad: Nunca guardamos contraseñas en texto plano, las hasheamos
  const hashed = await hashPassword(password);

  // Generamos un identificador único (tokken) para la sesión del usuario
  const tokken = uuidv4();

  // Persistimos los datos mediante el modelo de usuario
  await userModel.createUser({ tokken, userName, passwrd: hashed, email });

  return { tokken, userName, email };
}

/**
 * Valida las credenciales de un usuario para permitir el acceso.
 */
export async function authenticateUser(userName: string, password: string) {
  const user = await userModel.findUserByUsername(userName);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  // Verificamos si la contraseña coincide con el hash almacenado
  const isPasswordCorrect = await comparePassword(password, user.passwrd);
  if (!isPasswordCorrect) {
    throw { status: 401, message: "Credenciales inválidas" };
  }

  // Obtenemos los roles del usuario para completar su perfil de sesión
  const roles = await userModel.getRolesByUserToken(user.tokken);

  return {
    token: user.tokken,
    user: {
      userName: user.userName,
      email: user.email,
      roles: roles
    }
  };
}

/**
 * Obtiene el listado completo de usuarios y sus roles asociados.
 */
export async function listAllUsers() {
  return await userModel.getAllUsersWithRoles();
}

/**
 * Procesa la eliminación de un usuario del sistema.
 */
export async function removeUser(tokken: string) {
  await userModel.deleteUserByTokken(tokken);
}

/**
 * Gestiona la asignación de roles a un usuario específico.
 */
export async function assignRoleToUser(userToken: string, rolId: number) {
  // Verificamos la existencia del usuario antes de proceder
  const user = await userModel.findUserByTokken(userToken);
  if (!user) {
    throw { status: 404, message: "Usuario no encontrado" };
  }

  await userModel.addRoleToUser(userToken, rolId);
  return { userToken, rolId };
}
