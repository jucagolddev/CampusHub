import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Detalle de Proyecto (ProjectDetail)
 * Muestra la información completa y extendida de un único proyecto.
 * Incluye descripción detallada, galería de imágenes y enlaces externos.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  // NOTA: Se implementará la carga de datos por ID mediante el ActivatedRoute en el futuro.
}
