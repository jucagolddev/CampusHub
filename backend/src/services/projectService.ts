import * as projectModel from "../models/projectModel.js";

/**
 * Servicio de Gestión de Proyectos Académicos.
 * Centraliza la lógica de creación, actualización y validación de permisos
 * para asegurar la integridad de los datos educativos.
 */

/**
 * Orquesta la creación de un nuevo proyecto y su vinculación con el usuario creador.
 */
export async function createNewProject(
  projectData: projectModel.Project,
  userToken: string
) {
  // Primero insertamos los datos básicos del proyecto en la base de datos
  const newProjectId = await projectModel.createProject(projectData);

  // Automáticamente registramos al usuario actual como propietario/creador del proyecto
  await projectModel.linkProjectToUser(userToken, newProjectId);

  return newProjectId;
}

/**
 * Recupera el listado completo de todos los proyectos disponibles.
 */
export async function getAllAvailableProjects() {
  return await projectModel.getAllProjects();
}

/**
 * Actualiza la información de un proyecto, verificando primero los permisos del usuario.
 */
export async function updateExistingProject(
  id: number,
  userId: string,
  nombre: string,
  descripcion: string
) {
  // Seguridad: Verificamos que el usuario tenga permiso explícito para editar este proyecto
  const hasPermission = await projectModel.checkProjectPermission(userId, id);

  if (!hasPermission) {
    throw { status: 403, message: "No tienes permiso para editar este proyecto" };
  }

  // Si la verificación es correcta, procedemos con la actualización de los datos
  await projectModel.updateProject(id, nombre, descripcion);
}

/**
 * Procesa la eliminación completa de un proyecto del sistema.
 */
export async function deleteExistingProject(id: number) {
  await projectModel.deleteProject(id);
}
