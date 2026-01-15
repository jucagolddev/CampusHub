import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, ProjectData } from '../../../core/services/project.service';

/**
 * Componente de Subida de Proyectos (ProjectUpload)
 * Permite a los usuarios autenticados cargar la información, imágenes y enlaces de sus proyectos.
 */
@Component({
  selector: 'app-project-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-upload.component.html',
})
export class ProjectUploadComponent {
  // Datos del formulario vinculados con ngModel
  nombreProyecto = '';
  descripcionProyecto = '';
  urlProyecto = '';
  linkGithub = ''; // Se mapeará a urlGitHub
  imgPortada = ''; // URL de la imagen
  nombreCentro = ''; // (Opcional visual, no backend todavía)

  isLoading = false;

  constructor(private projectService: ProjectService, private router: Router) {}

  onSubmit(): void {
    if (this.isLoading) return;

    // Validación básica
    if (!this.nombreProyecto || !this.linkGithub) {
        alert('Por favor completa al menos el nombre y el link a GitHub.');
        return;
    }

    this.isLoading = true;

    const newProject: ProjectData = {
        nombreProyecto: this.nombreProyecto,
        descripcionProyecto: this.descripcionProyecto || 'Sin descripción',
        urlProyecto: this.urlProyecto,
        urlGitHub: this.linkGithub,
        imgPortada: this.imgPortada || 'https://via.placeholder.com/300' // Placeholder si no hay imagen
    };

    console.log('Enviando proyecto:', newProject);

    this.projectService.createProject(newProject).subscribe({
        next: (res) => {
            console.log('Proyecto creado:', res);
            alert('¡Proyecto subido con éxito!');
            this.isLoading = false;
            this.router.navigate(['/projects']); // Redirigir al listado
        },
        error: (err) => {
            console.error('Error al subir proyecto:', err);
            alert('Error al subir proyecto: ' + (err.error?.error || 'Error desconocido'));
            this.isLoading = false;
        }
    });
  }
}
