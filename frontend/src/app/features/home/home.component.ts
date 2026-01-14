import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { Project } from '../../core/models/project';

/**
 * Componente de la Página de Inicio (Home)
 * Es el punto de entrada principal donde se muestran el buscador, los filtros y la parrilla de proyectos.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  // Datos de prueba para simular una lista de proyectos destacados de la comunidad.
  allProjects: Project[] = [
    {
      id: 1,
      title: 'Dashboard Docente',
      description: 'Horario para los profesores.',
      categorias: ['Destacados', 'Planificación'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion ',
      githubLink: 'https://github.com/',
      authors: ['Pablo García'],
      executionUrl: 'https://example.com/demo1',
    },
    {
      id: 2,
      title: 'Calendario de tareas',
      description: 'Es un calendario donde los docentes pueden agregar tareas.',
      categorias: ['Destacados', 'Planificación'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion ',
      githubLink: 'https://github.com/',
      authors: ['Ana Belén'],
      executionUrl: 'https://example.com/demo2',
    },
    {
      id: 3,
      title: 'Generador de informes',
      description: 'Genera informes de los alumnos en pdf con sus datos.',
      categorias: ['Destacados', 'Utilidades'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion ',
      githubLink: 'https://github.com/PabloGD78/proyecto-pi',
      authors: ['Pablo GD'],
      executionUrl: 'https://example.com/demo3',
    },
  ];

  filteredProjects: Project[] = [...this.allProjects];
  searchTerm: string = '';

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
