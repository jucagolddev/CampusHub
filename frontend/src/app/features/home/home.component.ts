import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../core/models/project';
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

  // Colecciones para las distintas secciones de la vista
  featuredProjects: Project[] = []; 
  randomProjects: Project[] = []; 
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
   * Recupera los proyectos del servidor y configura la vista inicial.
   */
  ngOnInit(): void {
    // Verificamos permisos de administración
    this.isAdmin = this.authService.isAdmin();

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.allProjects = data.map(p => ({
          id: p.id,
          title: p.nombreProyecto,
          description: p.descripcionProyecto,
          authors: ['Usuario'], 
          categorias: p.id <= 3 ? ['Destacados', 'General'] : ['General'], // Lógica temporal para destacados
          technologies: ['Web'],
          image: p.imgPortada,
          githubLink: p.urlGitHub,
          executionUrl: p.urlProyecto,
          textolink: 'Ver Proyecto'
        }));

        this.setupView();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar proyectos en Home:', err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Organiza los proyectos en las secciones correspondientes (Destacados, Aleatorios).
   */
  private setupView(): void {
    // Filtramos los destacados
    this.featuredProjects = this.allProjects.filter(p => 
      p.categorias.includes('Destacados')
    ).slice(0, 3);

    // Fallback: si no hay destacados, tomamos los primeros
    if (this.featuredProjects.length === 0) {
      this.featuredProjects = this.allProjects.slice(0, 3);
    }

    // Configuración de la sección de proyectos aleatorios
    this.setRandomProjects();

    // Inicialmente mostramos todos los proyectos en el listado filtrable
    this.filteredProjects = [...this.allProjects];
  }

  /**
   * Genera una selección aleatoria de proyectos para mostrar variedad.
   */
  private setRandomProjects(): void {
    const featuredIds = this.featuredProjects.map(p => p.id);
    const others = this.allProjects.filter(p => !featuredIds.includes(p.id));
    
    // Algoritmo de mezcla y selección
    this.randomProjects = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Si no hay suficientes proyectos "otros", usamos un slice genérico
    if (this.randomProjects.length === 0 && this.allProjects.length > 3) {
      this.randomProjects = this.allProjects.slice(3, 6);
    }
  }

  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  filterByCategory(category: string): void {
    if (category === 'Todos') {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter((p) =>
        p.categorias.includes(category)
      );
    }
  }

  private applyFilters(): void {
    this.filteredProjects = this.allProjects.filter(
      (p) =>
        p.title.toLowerCase().includes(this.searchTerm) ||
        p.description.toLowerCase().includes(this.searchTerm) ||
        p.categorias.some((c) => c.toLowerCase().includes(this.searchTerm)) ||
        p.authors.some((a) => a.toLowerCase().includes(this.searchTerm))
    );
  }
}
