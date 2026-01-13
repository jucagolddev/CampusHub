import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';

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
  // En el futuro, estos datos se obtendrán dinámicamente desde una base de datos.
  projects = [
    {
      title: 'Proyecto 1',
      description: 'Esta es una breve descripción del proyecto.',
      technologies: ['Angular', 'Node', 'Js'],
      image: 'assets/images/placeholder.jpg',
      author: 'User Name',
      githubLink: '#'
    },
    {
      title: 'Proyecto 2',
      description: 'Descripción del proyecto 2.',
      technologies: ['Angular', 'Node', 'Js'],
      image: 'assets/images/placeholder.jpg',
      author: 'User Name',
      githubLink: '#'
    },
    {
      title: 'Proyecto 3',
      description: 'Descripción del proyecto 3.',
      technologies: ['Angular', 'Node', 'Js'],
      image: 'assets/images/placeholder.jpg',
      author: 'User Name',
      githubLink: '#'
    }
  ];
}
