import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../core/models/project.model';
import { ProjectService } from '../../core/services/project.service';
import { AuthService } from '../../core/services/auth.service';

/**
 * ==========================================
 * COMPONENTE HOME (Página Principal)
 * ==========================================
 * Página de aterrizaje de la plataforma.
 * Responsabilidades:
 * 1. Presentar el buscador global de proyectos.
 * 2. Mostrar selecciones de proyectos "Destacados" y "Aleatorios".
 * 3. Facilitar el filtrado rápido por categorías.
 * 
 * Los datos se cargan dinámicamente desde el ProjectService.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Lista maestra de proyectos obtenida de la API
  allProjects: Project[] = [];
  filteredProjects: Project[] = []; 
  searchTerm: string = ''; 
  isLoading = true;
  isAdmin = false;

  constructor(
    private projectService: ProjectService,
    private authService: AuthService
  ) {}

  /**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadProjects();
  }

  /**
   * Carga los proyectos desde el servicio.
   */
  loadProjects(): void {
    this.isLoading = true;
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.allProjects = data.map(p => ({
          id: p.id,
          title: p.nombreProyecto,
          description: p.descripcionProyecto,
          authors: ['Usuario'], 
          categorias: [], // Categorías ya no se usan en la UI
          technologies: ['Web'],
          image: p.imgPortada,
          githubLink: p.urlGitHub,
          executionUrl: p.urlProyecto,
          textolink: 'Ver Proyecto'
        }));

        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar proyectos en Home:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  /**
   * Recarga la lista tras una eliminación.
   */
  onProjectDeleted(): void {
    this.loadProjects();
  }

  private applyFilters(): void {
    if (!this.searchTerm) {
      this.filteredProjects = [...this.allProjects];
      return;
    }

    this.filteredProjects = this.allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(this.searchTerm) ||
        p.description.toLowerCase().includes(this.searchTerm) ||
        p.authors.some((a) => a.toLowerCase().includes(this.searchTerm))
    );
  }
}
