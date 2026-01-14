import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Project } from '../../../core/models/project';

/**
 * Componente Tarjeta de Proyecto (ProjectCard)
 * Visualiza de forma resumida la información de un proyecto individual.
 * Recibe los datos a través de una propiedad de entrada (Input).
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  // Propiedad de entrada que recibe el objeto proyecto completo desde el componente padre
  @Input() project!: Project;

  constructor(private router: Router) {}

  ejecutarProyecto(event: Event): void {
    // Evitamos que el clic se propague si viene de un enlace interno
    if (
      (event.target as HTMLElement).tagName === 'A' ||
      (event.target as HTMLElement).closest('a')
    ) {
      return;
    }

    if (this.project.executionUrl) {
      window.open(this.project.executionUrl, '_blank');
    }
  }
}
