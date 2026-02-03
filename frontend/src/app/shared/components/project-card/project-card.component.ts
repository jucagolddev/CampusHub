import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Project } from '../../../core/models/project';

/**
 * ==========================================
 * COMPONENTE TARJETA DE PROYECTO
 * ==========================================
 * Elemento de UI reutilizable para presentar el resumen de un proyecto en listas y grids.
 * Gestiona la navegación al detalle del proyecto o la apertura directa de la demo.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  // Datos del proyecto a visualizar, inyectados por el componente padre
  @Input() project!: Project;

  constructor(private router: Router) {}

  /**
   * Manejador de clic en la tarjeta.
   * Si el usuario no hace clic en un enlace específico, abrimos la URL de ejecución del proyecto.
   * Esto mejora la UX al hacer que toda la tarjeta sea interactiva.
   */
  ejecutarProyecto(event: Event): void {
    // Evitamos conflictos si se hace clic en enlaces internos (botones de acción)
    if (
      (event.target as HTMLElement).tagName === 'A' ||
      (event.target as HTMLElement).closest('a')
    ) {
      return;
    }

    // Abrimos la demo en una nueva pestaña si está disponible
    if (this.project.executionUrl) {
      window.open(this.project.executionUrl, '_blank');
    }
  }
}
