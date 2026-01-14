import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { Project } from '../../../core/models/project';

/**
 * Este es mi componente de Listado de Proyectos.
 * Aquí muestro el catálogo completo de trabajos disponibles en la plataforma.
 * He configurado una lista de datos de prueba para alimentar la vista, similar al Home,
 * pero centrada exclusivamente en mostrar todos los proyectos en un solo lugar.
 */
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  // Aquí mantengo mis proyectos. Los he definido con sus categorías y tecnologías
  // para que las tarjetas se rendericen correctamente con sus píldoras azules.
  projects: Project[] = [
    // ... listado de proyectos (Dashboard, Calendario, Generador, EUSA Quiz, etc.)
  ];
}
