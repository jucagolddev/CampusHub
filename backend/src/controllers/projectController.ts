import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import * as projectService from "../services/projectService.js";

/**
 * Gestión de Proyectos Académicos.
 * En estos controladores gestionamos la interacción con el usuario autenticado,
 * delegando la orquestación del negocio a la capa de servicios.
 */

/**
 * Crea un proyecto y lo vincula automáticamente al usuario que lo crea.
 */
export async function createProject(req: AuthRequest, res: Response) {
  try {
    const {
      nombreProyecto,
      descripcionProyecto,
      urlProyecto,
      urlGitHub,
      imgPortada,
    } = req.body;

    const userTokken = req.user?.tokken;

    if (!userTokken) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Delegamos la creación y vinculación compleja al servicio de proyectos
    const newProjectId = await projectService.createNewProject(
      { nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada },
      userTokken
    );

    return res.status(201).json({
      message: "Proyecto creado y asignado correctamente",
      id: newProjectId,
    });
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    return res.status(500).json({ error: "Error interno al crear proyecto" });
  }
}

/**
 * Lista todos los proyectos (Endpoint público).
 */
export async function listProjects(req: AuthRequest, res: Response) {
  try {
    const projects = await projectService.getAllAvailableProjects();
    return res.json(projects);
  } catch (err) {
    return res.status(500).json({ error: "Error al listar proyectos" });
  }
}

/**
 * Actualiza un proyecto existente previa verificación de autoría.
 */
export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userTokken = req.user?.tokken;
    const { nombreProyecto, descripcionProyecto } = req.body;

    if (!userTokken) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Delegamos la actualización y la comprobación de permisos al servicio
    await projectService.updateExistingProject(
      Number(id),
      userTokken,
      nombreProyecto,
      descripcionProyecto
    );

    return res.json({ message: "Proyecto actualizado correctamente" });
  } catch (err: any) {
    console.error("Error al actualizar proyecto:", err);
    
    // Capturamos errores de permiso (403) lanzados por el servicio
    const status = err.status || 500;
    const message = err.message || "Error interno al actualizar";
    
    return res.status(status).json({ error: message });
  }
}

/**
 * Elimina un proyecto del sistema (Solo administradores).
 */
export async function deleteProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID de proyecto requerido" });
    }

    // Delegamos la eliminación al servicio
    await projectService.deleteExistingProject(Number(id));

    return res.json({ message: "Proyecto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar proyecto:", err);
    return res.status(500).json({ error: "Error interno al eliminar el proyecto" });
  }
}
