import { Response } from "express";
import * as projectModel from "../models/projectModel.js";
import { AuthRequest } from "../middleware/authMiddleware.js";

/**
 * Gestión de Proyectos Académicos.
 * Estos endpoints requieren que el usuario esté autenticado.
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

    // Fase 1: Insertar el proyecto principal
    const newProjectId = await projectModel.createProject({
      nombreProyecto,
      descripcionProyecto,
      urlProyecto,
      urlGitHub,
      imgPortada,
    });

    // Fase 2: Registrar la relación de propiedad
    await projectModel.linkProjectToUser(userTokken, newProjectId);

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
    const projects = await projectModel.getAllProjects();
    return res.json(projects);
  } catch (err) {
    return res.status(500).json({ error: "Error al listar proyectos" });
  }
}

/**
 * Actualiza un proyecto.
 */
export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const userTokken = req.user?.tokken;
    const { nombreProyecto, descripcionProyecto } = req.body;

    if (!userTokken) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Seguridad: Verificación de pertenencia
    const hasPermission = await projectModel.checkProjectPermission(userTokken, Number(id));

    if (!hasPermission) {
      return res
        .status(403)
        .json({ error: "No tienes permiso para editar este proyecto" });
    }

    // Si tiene permiso, procedemos con la actualización
    await projectModel.updateProject(Number(id), nombreProyecto, descripcionProyecto);

    return res.json({ message: "Proyecto actualizado correctamente" });
  } catch (err) {
    console.error("Error al actualizar proyecto:", err);
    return res.status(500).json({ error: "Error interno al actualizar" });
  }
}
