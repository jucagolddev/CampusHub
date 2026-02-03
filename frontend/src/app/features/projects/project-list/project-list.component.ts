import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { Project } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

/**
 * ==========================================
 * COMPONENTE DE LISTADO DE PROYECTOS
 * ==========================================
 * Catálogo completo de aplicaciones y proyectos disponibles en la plataforma.
 * Se encarga de la recuperación de datos desde el backend y la presentación en rejilla.
 */
@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isLoading = true;

  constructor(private projectService: ProjectService) {}

  /**
   * Inicialización: Solicitamos la lista completa de proyectos.
   */
  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Carga asíncrona de proyectos y mapeo de datos.
   */
  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        // Transformamos los datos del backend al formato visual esperado
        this.projects = data.map(p => ({
          id: p.id,
          title: p.nombreProyecto,
          description: p.descripcionProyecto,
          authors: ['Usuario'], // Pendiente: integrar autores reales
          categorias: ['General'], 
          technologies: ['Web'],
          image: p.imgPortada,
          githubLink: p.urlGitHub,
          executionUrl: p.urlProyecto,
          textolink: 'Ver Proyecto'
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar catálogo de proyectos:', err);
        this.isLoading = false;
      }
    });
  }
}
