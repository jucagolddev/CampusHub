import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { Project } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

/**
 * COMPONENTE DE LISTADO DE PROYECTOS (ProjectListComponent)
 * -------------------------------------------------------------------------
 * Proporciona una vista de catálogo completa donde se muestran todas las
 * aplicaciones y trabajos técnicos disponibles en CampusHub.
 * 
 * Implementa una carga asíncrona de datos desde la API y maneja estados
 * de carga para mejorar la experiencia de usuario (UX).
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

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        // Mapeamos los campos del backend a los campos esperados por el frontend
        this.projects = data.map(p => ({
          id: p.id,
          title: p.nombreProyecto,
          description: p.descripcionProyecto,
          authors: ['Usuario'], // Por defecto hasta tener relación en BD
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
        console.error('Error al cargar proyectos:', err);
        this.isLoading = false;
      }
    });
  }
}
