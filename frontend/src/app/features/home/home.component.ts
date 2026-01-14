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
      title: 'Dashboard Docente',
      description: 'Horario para los profesores.',
      technologies: ['Angular', 'Node', 'Js'],
      image: 'assets/images/placeholder.jpg',
      author: 'User Name',
      githubLink: '#',
    },
    {
      title: 'Calendario de tareas',
      description: 'Es un calendario donde los docentes pueden agregar tareas.',
      technologies: ['Angular', 'Node', 'Js'],
      image: 'assets/images/placeholder.jpg',
      author: 'User Name',
      githubLink: '#',
    },
    {
      title: 'Generador de informes',
      description: 'Genera informes de los alumnos en pdf con sus datos.',
      technologies: ['Angular', 'Node', 'Js'],
      image: 'assets/images/placeholder.jpg',
      author: 'User Name',
      githubLink: '#https://github.com/PabloGD78/proyecto-pi',
    },
  ];
}
