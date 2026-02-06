import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../../core/models/project.model';
import { ProjectService } from '../../../core/services/project.service';

/**
 * ==========================================
 * COMPONENTE DE DETALLE DE PROYECTO
 * ==========================================
 * Muestra la información completa de un proyecto específico identificado por su ID.
 * Recupera los datos del servidor y renderiza la vista detallada.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  /**
   * Al iniciar, capturamos el ID de la URL y cargamos el proyecto.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProject(id);
    }
  }

  /**
   * Realiza la petición al servicio para obtener los detalles del proyecto.
   */
  private loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe({
      next: (p) => {
        this.project = {
          id: p.id,
          title: p.nombreProyecto,
          description: p.descripcionProyecto,
          authors: ['Usuario'], 
          categorias: p.id <= 3 ? ['Destacados', 'General'] : ['General'],
          technologies: ['Web'],
          image: p.imgPortada,
          githubLink: p.urlGitHub,
          executionUrl: p.urlProyecto,
          textolink: 'Ver Proyecto'
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener detalles del proyecto:', err);
        this.isLoading = false;
      }
    });
  }
}
