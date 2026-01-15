/**
 * MIDDLEWARE DE AUTENTICACIÓN (authMiddleware.ts)
 * -------------------------------------------------------------------------
 * Este componente actúa como un guardián de seguridad para los endpoints
 * privados de la API. Su misión es interceptar las peticiones, validar el
 * token de sesión proporcionado en las cabeceras y cargar la identidad
 * del usuario en el objeto de la petición (request).
 * 
 * Es fundamental para garantizar que solo usuarios autorizados puedan
 * realizar acciones como publicar proyectos o editar perfiles.
 */

import { Request, Response, NextFunction } from 'express';
// Importamos la capa de acceso a datos de usuarios
import * as userModel from '../models/userModel';

/**
 * Extendemos la interfaz Request de Express para incluir la propiedad 'user'.
 * Esto permite que TypeScript reconozca 'req.user' en los controladores siguientes.
 */
export interface AuthRequest extends Request {
    user?: userModel.User;
}

/**
 * Función Middleware Principal
 */
export default async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  // 1. Obtener el token del header Authorization
  // Formato esperado: "Bearer <token>"
  const header = req.headers['authorization'];
  if (!header) {
      return res.status(401).json({ error: 'Acceso Denegado: Token requerido' });
  }

  // Separamos "Bearer" del token real
  const token = header.split(' ')[1];
  if (!token) {
      return res.status(401).json({ error: 'Acceso Denegado: Formato de token inválido' });
  }

  try {
    // 2. Buscamos al usuario en la BD usando ese token
    // NOTA DE MIGRACIÓN: En la lógica original, parece que el "token" JWT o ID se usaba para buscar directamente.
    // Si esto fuera JWT real, aquí deberíamos hacer jwt.verify() primero.
    // Asumiremos que el flujo heredado usa el token como identificador de sesión por ahora.
    const user = await userModel.findUserByTokken(token);

    if (!user) {
      return res.status(401).json({ error: 'Acceso Denegado: Token inválido o usuario no encontrado' });
    }

    // 3. Autenticación Exitosa: Guardamos usuario en request
    req.user = user; 
    
    // Pasamos al siguiente middleware o controlador
    next();

  } catch (err) {
    console.error('[AUTH ERROR]', err);
    return res.status(500).json({ error: 'Error interno al verificar la sesión' });
  }
};
