import db from "../db/index.js";

export interface Project {
  id?: number;
  nombreProyecto: string;
  descripcionProyecto: string;
  urlProyecto: string;
  urlGitHub: string;
  imgPortada: string;
}

/**
 * Crea un nuevo proyecto y devuelve su ID.
 */
export async function createProject(project: Project): Promise<number> {
  const sql = `INSERT INTO PROYECTO (nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada) VALUES (?, ?, ?, ?, ?)`;
  const [result]: any = await db.execute(sql, [
    project.nombreProyecto,
    project.descripcionProyecto,
    project.urlProyecto,
    project.urlGitHub,
    project.imgPortada,
  ]);
  return result.insertId;
}

/**
 * Vincula un proyecto a un usuario (creador).
 */
export async function linkProjectToUser(tokken: string, projectId: number) {
  const sql = `INSERT INTO USUARIO_PROYECTO (tokken, proyectoId) VALUES (?, ?)`;
  await db.execute(sql, [tokken, projectId]);
}

/**
 * Obtiene todos los proyectos.
 */
export async function getAllProjects(): Promise<Project[]> {
  const [rows] = await db.execute("SELECT * FROM PROYECTO");
  return rows as Project[];
}

/**
 * Verifica si un usuario tiene permisos sobre un proyecto.
 */
export async function checkProjectPermission(tokken: string, projectId: number): Promise<boolean> {
  const [rows]: any[] = await db.execute(
    "SELECT * FROM USUARIO_PROYECTO WHERE tokken = ? AND proyectoId = ?",
    [tokken, projectId]
  );
  return rows.length > 0;
}

/**
 * Actualiza un proyecto existente.
 */
export async function updateProject(id: number, nombre: string, descripcion: string) {
  const sql = `UPDATE PROYECTO SET nombreProyecto = ?, descripcionProyecto = ? WHERE id = ?`;
  await db.execute(sql, [nombre, descripcion, id]);
}

/**
 * Elimina un proyecto y todas sus relaciones asociadas.
 */
export async function deleteProject(id: number) {
  // 1. Eliminar relaciones en tablas intermedias
  await db.execute("DELETE FROM USUARIO_PROYECTO WHERE proyectoId = ?", [id]);
  await db.execute("DELETE FROM PROYECTO_CENTRO WHERE proyectoId = ?", [id]);

  // 2. Eliminar el proyecto principal
  const sql = `DELETE FROM PROYECTO WHERE id = ?`;
  await db.execute(sql, [id]);
}
