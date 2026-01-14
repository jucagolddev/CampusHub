import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../core/models/project';

/**
 * ¡Bienvenido a mi componente Home!
 * Este es el punto de entrada principal donde orquesto todo el escaparate de proyectos.
 * He diseñado este componente para que sea dinámico, permitiendo búsquedas y filtrados
 * instantáneos para mejorar la experiencia del usuario.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Aquí mantengo mi base de datos de proyectos completa.
  // Es mi fuente de verdad de la que extraigo los destacados y aleatorios.
  allProjects: Project[] = [
    // ... listado de proyectos (Dashboard, Calendario, Generador, EUSA Quiz, etc.)
  ];

  // Estas son las colecciones que uso para alimentar las diferentes secciones de mi vista.
  featuredProjects: Project[] = []; // Los 3 proyectos que quiero que siempre resalten.
  randomProjects: Project[] = []; // Una selección fresca de 3 proyectos cada vez que entras.
  filteredProjects: Project[] = []; // El cajón desastre donde pongo los resultados de búsqueda.
  searchTerm: string = ''; // El texto que el usuario está escribiendo ahora mismo.

  /**
   * Al iniciar el componente, preparo el terreno.
   * Filtro los destacados por sus IDs fijos y elijo los aleatorios.
   */
  ngOnInit(): void {
    // Escojo mis "Top 3" favoritos por sus IDs 1, 2 y 3.
    this.featuredProjects = this.allProjects.filter((p) =>
      [1, 2, 3].includes(p.id)
    );

    // Preparo la sección inferior con una mezcla fresca.
    this.setRandomProjects();

    // Por defecto, mis resultados filtrados son todos los proyectos hasta que alguien busque algo.
    this.filteredProjects = [...this.allProjects];
  }

  /**
   * Aquí es donde hago la "magia" de la aleatoriedad.
   * Tomo todos los que no son destacados, los mezclo y me quedo con 3.
   */
  private setRandomProjects(): void {
    const others = this.allProjects.filter((p) => ![1, 2, 3].includes(p.id));
    // Uso un algoritmo simple de mezcla para que la web se sienta "viva".
    this.randomProjects = others.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  /**
   * Gestiono la búsqueda principal.
   * Guardo el término y lanzo mis filtros para actualizar la pantalla.
   */
  onSearch(term: string): void {
    this.searchTerm = term.toLowerCase();
    this.applyFilters();
  }

  /**
   * Permito filtrar por las categorías que he definido.
   * Si me dicen 'Todos', reseteo; si no, busco los que coincidan exactamente.
   */
  filterByCategory(category: string): void {
    if (category === 'Todos') {
      this.filteredProjects = [...this.allProjects];
    } else {
      this.filteredProjects = this.allProjects.filter((p) =>
        p.categorias.includes(category)
      );
    }
  }

  /**
   * Mi motor de filtrado interno.
   * Compruebo títulos, descripciones, categorías y autores para que la búsqueda sea potente.
   */
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
