import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Listado de Proyectos (ProjectList)
 * Encargado de mostrar la colección completa de proyectos disponibles en la plataforma.
 * Permite la navegación y filtrado avanzado de trabajos.
 */
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  // NOTA: Se integrará la lógica de paginación y filtros dinámicos en futuras versiones.
}
