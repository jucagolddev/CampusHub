import { Request, Response, NextFunction } from "express";
import * as userModel from "../models/userModel.js";
import { User } from "../types.js";

/**
 * Interfaz extendida para incluir los datos del usuario autenticado
 * dentro del objeto 'req' de Express.
 */
export interface AuthRequest extends Request {
  user?: User;
}

/**
 * Middleware de Autenticación.
 * Verifica que el cliente envíe un token válido en la cabecera 'Authorization'.
 *
 * Uso: router.get('/privado', authMiddleware, (req, res) => { ... })
 */
export default async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Intentamos obtener el header de autorización
  const header = req.headers["authorization"];
  if (!header)
    return res
      .status(401)
      .json({ error: "Token requerido (Authorization: Bearer <token>)" });

  // El formato esperado es "Bearer <token>"
  const token = header.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Formato de token inválido" });

  try {
    /**
     * IMPORTANTE:
     * En este proyecto, el token es el UUID almacenado directamente en la columna 'tokken'
     * de la tabla Usuario. No estamos usando JWT.
     */
    const user = await userModel.findUserByTokken(token);

    if (!user) {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }

    // Si el usuario existe, adjuntamos sus datos a la petición para que el controlador los use
    req.user = user;

    // Continuamos hacia el siguiente middleware o controlador
    next();
  } catch (err) {
    console.error("Error en authMiddleware:", err);
    return res
      .status(500)
      .json({ error: "Error interno al verificar la sesión" });
  }
}
/**
 * Middleware para verificar si el usuario es Administrador.
 * Debe usarse DESPUÉS de authMiddleware para tener req.user disponible.
 */
export async function isAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    const roles = await userModel.getRolesByUserToken(user.tokken);

    if (roles.includes("Administrador")) {
      next();
    } else {
      return res.status(403).json({ error: "Acceso prohibido: Se requiere rol de Administrador" });
    }
  } catch (error) {
    console.error("Error en isAdmin middleware:", error);
    res.status(500).json({ error: "Error al verificar permisos de administrador" });
  }
}
