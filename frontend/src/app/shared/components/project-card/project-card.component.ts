import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Project } from '../../../core/models/project';

/**
 * ¡Esta es mi tarjeta de proyecto!
 * Es el componente que más repito en la app, así que lo he diseñado para que sea
 * muy ligero y visual. Recibe los datos de un proyecto y se encarga de pintarlos
 * de forma elegante en el grid.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  // Recibo el proyecto como un regalo del componente padre (@Input).
  @Input() project!: Project;

  constructor(private router: Router) {}

  /**
   * Aquí gestiono qué pasa cuando alguien hace clic en la tarjeta.
   * He programado esto para que, si el clic NO es en el enlace de detalles,
   * se abra automáticamente la demo del proyecto en una nueva pestaña.
   */
  ejecutarProyecto(event: Event): void {
    // Si están pinchando en un enlace interno (como el de 'Descubre más'),
    // me aparto y dejo que el Router haga su trabajo.
    if (
      (event.target as HTMLElement).tagName === 'A' ||
      (event.target as HTMLElement).closest('a')
    ) {
      return;
    }

    // Si tenemos una URL de ejecución, ¡adelante! Lanzamos la demo.
    if (this.project.executionUrl) {
      window.open(this.project.executionUrl, '_blank');
    }
  }
}
