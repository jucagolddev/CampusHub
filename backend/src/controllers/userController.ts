import { Request, Response } from "express";
import * as authService from "../services/authService.js";

/**
 * Controladores para la gestión de usuarios (Registro y Autenticación).
 * En esta capa solo manejamos la entrada/salida HTTP, delegando la inteligencia
 * al servicio correspondiente para mantener un código limpio y profesional.
 */

/**
 * Registra un nuevo usuario en la plataforma.
 */
export async function register(req: Request, res: Response) {
  try {
    const { userName, password, email } = req.body;

    // Validación básica de entrada (Capa de Transporte)
    if (!userName || !password || !email) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Delegamos la lógica de registro al servicio de autenticación
    const result = await authService.registerUser(userName, password, email);

    // Si todo ha ido bien, devolvemos la respuesta exitosa
    return res.status(201).json(result);
  } catch (err: any) {
    console.error("Error en registro:", err);
    
    // Capturamos errores específicos lanzados por el servicio o errores genéricos
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    
    return res.status(status).json({ error: message });
  }
}

/**
 * Autentica un usuario existente para iniciar sesión.
 */
export async function login(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;

    // Delegamos la validación de credenciales al servicio especializado
    const authData = await authService.authenticateUser(userName, password);

    // Devolvemos los datos de autenticación necesarios para el frontend
    return res.json({
      message: "Login exitoso",
      ...authData
    });
  } catch (err: any) {
    console.error("Error en login:", err);
    
    const status = err.status || 500;
    const message = err.message || "Error interno del servidor";
    
    return res.status(status).json({ error: message });
  }
}

/**
 * Obtiene la lista de todos los usuarios registrados.
 */
export async function getUsers(req: Request, res: Response) {
  try {
    const users = await authService.listAllUsers();
    return res.json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    return res.status(500).json({ error: "Error al listar usuarios" });
  }
}

/**
 * Elimina un usuario del sistema mediante su identificador único.
 */
export async function deleteUser(req: Request, res: Response) {
  try {
    const { tokken } = req.params;

    if (!tokken) {
      return res.status(400).json({ error: "Token de usuario requerido" });
    }

    await authService.removeUser(tokken);
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    return res.status(500).json({ error: "Error al eliminar usuario" });
  }
}

/**
 * Cambia o asigna un nuevo rol a un usuario determinado.
 */
export async function changeUserRole(req: Request, res: Response) {
  try {
    const { userToken } = req.params;
    const { rolId } = req.body;

    if (!userToken || !rolId) {
      return res.status(400).json({ error: "Token de usuario y ID de rol son requeridos" });
    }

    // Delegamos la asignación y validación de existencia al servicio
    const result = await authService.assignRoleToUser(userToken, Number(rolId));

    return res.status(200).json({ 
      message: "Rol asignado correctamente",
      ...result 
    });
  } catch (err: any) {
    console.error("Error al asignar rol:", err);
    
    const status = err.status || 500;
    const message = err.message || "Error interno al asignar el rol";
    
    return res.status(status).json({ error: message });
  }
}
