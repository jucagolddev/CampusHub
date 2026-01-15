import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../core/models/project';
import { ProjectService } from '../../core/services/project.service';

/**
 * COMPONENTE HOME (HomeComponent)
 * -------------------------------------------------------------------------
 * Es la página de aterrizaje principal de CampusHub. Su responsabilidad es:
 * 1. Presentar el buscador global de proyectos.
 * 2. Mostrar una selección dinámica de proyectos "Destacados" y "Aleatorios".
 * 3. Gestionar los filtros rápidos por categoría.
 * 
 * Los datos se obtienen de forma asíncrona desde el ProjectService al iniciar
 * el componente (ngOnInit).
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Lista maestra de proyectos (ahora viene de la API)
  allProjects: Project[] = [];

  // Colecciones para la vista
  featuredProjects: Project[] = []; 
  randomProjects: Project[] = []; 
  filteredProjects: Project[] = []; 
  searchTerm: string = ''; 
  isLoading = true;

  constructor(private projectService: ProjectService) {}

  /**
   * Al iniciar el componente, pido los datos al servidor.
   */
  ngOnInit(): void {
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
   * Configura las secciones de destacados y aleatorios una vez tenemos los datos.
   */
  private setupView(): void {
    // Filtramos los destacados (IDs 1, 2, 3 o los que tengan la categoría)
    this.featuredProjects = this.allProjects.filter(p => 
      p.categorias.includes('Destacados')
    ).slice(0, 3);

    // Si no hay suficientes destacados por categoría, cogemos los primeros 3
    if (this.featuredProjects.length === 0) {
      this.featuredProjects = this.allProjects.slice(0, 3);
    }

    // Preparo la sección inferior con una mezcla fresca.
    this.setRandomProjects();

    // Por defecto, mis resultados filtrados son todos los proyectos hasta que alguien busque algo.
    this.filteredProjects = [...this.allProjects];
  }

  /**
   * Aquí es donde hago la "magia" de la aleatoriedad.
   */
  private setRandomProjects(): void {
    const featuredIds = this.featuredProjects.map(p => p.id);
    const others = this.allProjects.filter(p => !featuredIds.includes(p.id));
    
    // Mezclamos y cogemos 3
    this.randomProjects = others.sort(() => 0.5 - Math.random()).slice(0, 3);
    
    // Si no hay "otros", cogemos algunos de los que haya
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
