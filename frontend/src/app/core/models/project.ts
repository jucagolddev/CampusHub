/**
 * Definición de la interfaz Project.
 * Aquí diseño la estructura que debe seguir cada proyecto dentro de CampusHub.
 * Me aseguro de capturar todos los detalles necesarios, desde la identidad básica
 * hasta los enlaces técnicos y autores.
 */
export interface Project {
  // El identificador único que uso para las rutas y búsquedas específicas.
  id: number;

  // La ruta a la imagen que representará visualmente el proyecto.
  image: string;

  // Lista de categorías para organizar los proyectos (ej: 'Destacados', 'Educación').
  categorias: string[];

  // Tecnologías específicas que he querido destacar para el detalle del proyecto.
  technologies: string[];

  // El nombre oficial del proyecto que mostraré en las tarjetas y cabeceras.
  title: string;

  // Una explicación detallada de lo que hace el proyecto.
  description: string;

  // El texto personalizado que uso para el botón de acción en las tarjetas.
  textolink: string;

  // Enlace directo al repositorio de GitHub del código fuente.
  githubLink: string;

  // Un listado con los nombres de los alumnos que han creado el proyecto.
  authors: string[];

  // URL donde se puede ver el proyecto en ejecución o una demo.
  executionUrl: string;
}
