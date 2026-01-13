import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente de Subida de Proyectos (ProjectUpload)
 * Permite a los usuarios autenticados cargar la información, imágenes y enlaces de sus proyectos.
 */
@Component({
  selector: 'app-project-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-upload.component.html',
})
export class ProjectUploadComponent {
  // NOTA: Se implementará la lógica de manejo de archivos y envío a la API en próximas fases.
}
