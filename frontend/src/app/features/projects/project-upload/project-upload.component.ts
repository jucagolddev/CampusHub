import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, ProjectData } from '../../../core/services/project.service';
import { NotificationService } from '../../../core/services/notification.service';

/**
 * ==========================================
 * COMPONENTE DE SUBIDA DE PROYECTOS
 * ==========================================
 * Formulario que permite a los usuarios registrados publicar nuevos proyectos.
 * Valida la información básica y la envía al backend.
 */
@Component({
  selector: 'app-project-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-upload.component.html',
  styleUrls: ['./project-upload.component.scss']
})
export class ProjectUploadComponent {
  // Modelo de datos para el formulario
  nombreProyecto = '';
  descripcionProyecto = '';
  urlProyecto = '';
  linkGithub = ''; // Mapeo a urlGitHub
  imgPortada = ''; 
  nombreCentro = ''; 

  isLoading = false;

  constructor(
    private projectService: ProjectService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  /**
   * Envío del formulario de creación de proyecto.
   */
  onSubmit(): void {
    if (this.isLoading) return;

    // Validación de campos obligatorios
    if (!this.nombreProyecto || !this.linkGithub) {
        this.notificationService.showWarning('Por favor complete los campos obligatorios (Nombre y GitHub).');
        return;
    }

    this.isLoading = true;

    // Construcción del objeto de datos
    const newProject: ProjectData = {
        nombreProyecto: this.nombreProyecto,
        descripcionProyecto: this.descripcionProyecto || 'Sin descripción',
        urlProyecto: this.urlProyecto,
        urlGitHub: this.linkGithub,
        imgPortada: this.imgPortada || 'https://via.placeholder.com/300'
    };

    this.projectService.createProject(newProject).subscribe({
        next: (res) => {
            this.notificationService.showSuccess('¡Proyecto publicado correctamente!');
            this.isLoading = false;
            this.router.navigate(['/']); // Redirigir a Home, ya que /projects no existe
        },
        error: (err) => {
            console.error('Error al subir proyecto:', err);
            this.notificationService.showError('Error al publicar el proyecto. Inténtelo de nuevo.');
            this.isLoading = false;
        }
    });
  }
}
