import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
})
export class ProjectListComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Dashboard Docente',
      description: 'Horario para los profesores.',
      categorias: ['Destacados', 'Planificación'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Link a github',
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
      textolink: 'Link a github',
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
      textolink: 'Link a github',
      githubLink: 'https://github.com/PabloGD78/proyecto-pi',
      authors: ['Pablo GD'],
      executionUrl: 'https://example.com/demo3',
    },
  ];
}
