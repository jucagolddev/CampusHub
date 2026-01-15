import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project.service';

/**
 * COMPONENTE DE DETALLE DE PROYECTO (ProjectDetailComponent)
 * -------------------------------------------------------------------------
 * Ofrece una vista pormenorizada de un proyecto específico, mostrando su
 * descripción completa, autores, tecnologías y enlaces de ejecución.
 * 
 * Extrae el identificador único (ID) de la URL activa y consulta al servidor
 * para obtener la información más reciente vinculada a ese recurso.
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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProject(id);
    }
  }

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
        console.error('Error al cargar detalle del proyecto:', err);
        this.isLoading = false;
      }
    });
  }
}
