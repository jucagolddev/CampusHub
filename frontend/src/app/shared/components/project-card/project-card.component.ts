import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Interfaz que define la estructura de datos de un Proyecto.
 * Se utiliza para asegurar la consistencia de los datos en toda la aplicación.
 */
export interface Project {
  image: string;        // URL o ruta de la imagen de previsualización
  technologies: string[]; // Lista de tecnologías utilizadas (ej. ['Angular', 'SCSS'])
  title: string;        // Título descriptivo del proyecto
  description: string;  // Breve resumen del objetivo del proyecto
  author: string;       // Nombre del creador o autor del proyecto
  githubLink: string;   // Enlace al repositorio de código fuente
}

/**
 * Componente Tarjeta de Proyecto (ProjectCard)
 * Visualiza de forma resumida la información de un proyecto individual.
 * Recibe los datos a través de una propiedad de entrada (Input).
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  // Propiedad de entrada que recibe el objeto proyecto completo desde el componente padre
  @Input() project!: Project;
}
