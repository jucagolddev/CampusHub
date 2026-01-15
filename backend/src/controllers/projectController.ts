/**
 * CONTROLADOR DE PROYECTOS (projectController.ts)
 * -------------------------------------------------------------------------
 * Gestiona todas las operaciones relacionadas con las aplicaciones y trabajos
 * publicados en CampusHub. Incluye la creación, el listado general, la
 * obtención de detalles individuales y la actualización de datos.
 * 
 * Este controlador interactúa directamente con el pool de conexiones de MySQL
 * y aplica reglas de negocio específicas de la plataforma.
 */

import { Request, Response } from 'express';
import pool from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
// Importamos la interfaz AuthRequest para tipado correcto de req.user
import { AuthRequest } from '../middlewares/authMiddleware'; 

/**
 * CREAR PROYECTO (createProject)
 * -------------------------------------------------------------------------
 * Registra un nuevo proyecto en la base de datos y establece al usuario
 * actual como su creador oficial.
 * 
 * @param req AuthRequest con los datos del proyecto y el usuario autenticado.
 * @param res Response para enviar confirmación o error.
 * @returns 201 (Created) si tiene éxito, 403 si el rol no lo permite.
 */
export async function createProject(req: AuthRequest, res: Response) {
  try {
    // Datos del body
    const { nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada } = req.body;
    
    // Datos del usuario (inyectados por authMiddleware)
    // El '!' le dice a TS que estamos seguros que user existe (validado por middleware)
    const user = req.user!; 
    
    // --- VALIDACIÓN DE PERMISOS (BUSINESS RULES) ---
    // Regla: Si rolId es 1 (Alumno?), prohibimos crear proyectos.
    if (user.rolId === 1) {
        return res.status(403).json({ 
            error: 'Permiso denegado: Los usuarios con este rol no pueden crear proyectos.' 
        });
    }

    // Validación extra de seguridad
    if (!user.rolId) {
        // Si no tiene rol, asumimos "sin permisos"
       return res.status(403).json({ error: 'Usuario sin rol asignado en el sistema.' });
    }
    // -----------------------------------------------

    // 1. Insertar el proyecto en la tabla PROYECTO
    const sqlProject = `INSERT INTO PROYECTO (nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute<ResultSetHeader>(sqlProject, [nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada]);
    
    const newProjectId = result.insertId;

    // 2. Crear la relación en la tabla intermedia USUARIO_PROYECTO
    // Esto vincula al usuario como "Creador" (creadorProyecto = 1)
    const sqlRelation = `INSERT INTO USUARIO_PROYECTO (tokken, proyectoId, creadorProyecto) VALUES (?, ?, ?)`;
    
    // tokken del usuario, ID del proyecto nuevo, 1 (true)
    await pool.execute(sqlRelation, [user.tokken, newProjectId, 1]);

    // Respuesta exitosa
    return res.status(201).json({ 
      message: 'Proyecto creado correctamente',
      id: newProjectId,
      proyecto: {
          nombreProyecto,
          creador: user.userName
      }
    });

  } catch (err) {
    console.error('[ERROR CREATE PROJECT]', err);
    return res.status(500).json({ error: 'Error interno al crear proyecto' });
  }
}

/**
 * LIST PROJECTS
 * Devuelve todos los proyectos del sistema.
 * Nota: Puede refinarse para paginación futura.
 */
export async function listProjects(req: Request, res: Response) {
  try {
    const [rows] = await pool.execute('SELECT * FROM PROYECTO');
    return res.json(rows);
  } catch (err) {
    console.error('[ERROR LIST PROJECTS]', err);
    return res.status(500).json({ error: 'Error al obtener la lista de proyectos' });
  }
}

/**
 * UPDATE PROJECT
 * Actualiza nombre o descripción de un proyecto.
 * Incluye validación estricta de propiedad.
 */
export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params; // ID del proyecto a editar
    const userTokken = req.user!.tokken; // Token del usuario logueado
    const { nombreProyecto, descripcionProyecto } = req.body;

    // 1. VERIFICACIÓN DE PROPIEDAD
    // Consultamos la tabla intermedia para ver si este usuario es el DUEÑO de este proyecto.
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT creadorProyecto FROM USUARIO_PROYECTO WHERE tokken = ? AND proyectoId = ?', 
      [userTokken, id]
    );

    // Caso A: No existe relación (El usuario no tiene nada que ver con este proyecto)
    if (rows.length === 0) {
      return res.status(403).json({ error: 'Acceso Denegado: No tienes relación con este proyecto.' });
    }

    // Caso B: Existe relación, pero NO es el creador (Es colaborador)
    // En MySQL, boolean true se devuelve como 1.
    if (rows[0].creadorProyecto !== 1) {
       return res.status(403).json({ error: 'Acceso Denegado: Solo el creador original puede editar el proyecto.' });
    }

    // 2. ACTUALIZACIÓN (Si pasó las validaciones)
    const sqlUpdate = `UPDATE PROYECTO SET nombreProyecto = ?, descripcionProyecto = ? WHERE id = ?`;
    await pool.execute(sqlUpdate, [nombreProyecto, descripcionProyecto, id]);

    return res.json({ message: 'Proyecto actualizado correctamente' });
  } catch (err) {
    console.error('[ERROR UPDATE PROJECT]', err);
    return res.status(500).json({ error: 'Error interno al actualizar proyecto' });
  }
}

/**
 * GET PROJECT BY ID
 * Devuelve un proyecto específico.
 */
export async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM PROYECTO WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    
    return res.json(rows[0]);
  } catch (err) {
    console.error('[ERROR GET PROJECT BY ID]', err);
    return res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
}
