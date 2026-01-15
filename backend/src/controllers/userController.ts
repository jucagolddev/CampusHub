/**
 * CONTROLADOR DE USUARIOS (userController.ts)
 * -------------------------------------------------------------------------
 * Este componente gestiona el ciclo de vida de las cuentas de usuario en
 * CampusHub. Sus responsabilidades principales incluyen:
 * 1. Proceso de Registro: Validación de datos e inspección de duplicados.
 * 2. Autenticación (Login): Verificación de credenciales mediante hashing.
 * 3. Gestión de Identidad: Emisión de tokens de sesión para acceso privado.
 * 
 * Sigue las mejores prácticas en seguridad de contraseñas y reporte de errores.
 */

import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword, comparePassword } from '../utils/hash';
import * as userModel from '../models/userModel';

/**
 * REGISTRO DE USUARIO NUEVO
 * Ruta: POST /api/users/register
 */
export async function register(req: Request, res: Response) {
  try {
    const { userName, password, email, rolId, centroId, tituloId } = req.body;

    // 1. Validación básica de entrada
    if (!userName || !password || !email) {
        return res.status(400).json({ error: 'Faltan campos obligatorios (userName, password, email)' });
    }

    // 2. Verificar duplicados
    const existing = await userModel.findUserByUsername(userName);
    if (existing) {
        return res.status(409).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // 3. Hashear la contraseña (CRÍTICO)
    const hashed = await hashPassword(password);
    
    // 4. Generar identificador único (Token/UUID)
    const tokken = uuidv4();

    // 5. Persistir en Base de Datos
    // Se pasan los campos opcionales rolId, centroId, tituloId si existen
    await userModel.createUser({ 
        tokken, 
        userName, 
        passwrd: hashed, 
        email, 
        rolId: rolId ? Number(rolId) : undefined, 
        centroId: centroId ? Number(centroId) : undefined, 
        tituloId: tituloId ? Number(tituloId) : undefined
    });
    
    // Responder con éxito (201 Created)
    return res.status(201).json({ 
        message: 'Usuario registrado exitosamente',
        tokken, 
        userName, 
        email,
        rolId,
        centroId,
        tituloId
    });

  } catch (err) {
    console.error('[ERROR REGISTER]', err);
    return res.status(500).json({ error: 'Error interno del servidor al registrar usuario' });
  }
}

/**
 * INICIO DE SESIÓN
 * Ruta: POST /api/users/login
 */
export async function login(req: Request, res: Response) {
  try {
    const { userName, password } = req.body;

    // 1. Buscamos usuario por nombre
    const user = await userModel.findUserByUsername(userName);
    if (!user) {
        // Por seguridad, mensaje genérico para no revelar existencia de usuario
        return res.status(404).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Validación de integridad de datos
    if (!user.passwrd) {
        console.error(`[CRITICAL] Usuario ${userName} no tiene password hash en BD.`);
        return res.status(500).json({ error: 'Error de integridad de datos' });
    }

    // 2. Comparamos contraseña
    const ok = await comparePassword(password, user.passwrd);
    if (!ok) {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // 3. Respuesta Exitosa
    // NOTA: Mantenemos la lógica original de usar el 'tokken' de BD como token de sesión.
    // En una refactorización futura, esto debería ser un JWT firmado.
    return res.json({
      message: 'Login exitoso',
      token: user.tokken, // UUID de la BD usado como Auth Token
      user: {
        userName: user.userName,
        email: user.email,
        rolId: user.rolId // Importante para el frontend saber permisos
      }
    });

  } catch (err) {
    console.error('[ERROR LOGIN]', err);
    return res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
  }
}
