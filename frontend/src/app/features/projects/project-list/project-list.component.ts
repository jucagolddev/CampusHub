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
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: 'https://github.com/',
      authors: ['Pablo García'],
      executionUrl: 'https://example.com/demo1',
    },
    {
      id: 2,
      title: 'Calendario de tareas',
      description: 'Es un calendario donde los docentes pueden agregar tareas.',
      categorias: ['Destacados', 'Planificación'],
      technologies: ['HTML', 'JavaScript', 'CSS'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: 'https://github.com/',
      authors: ['Ana Belén'],
      executionUrl: 'https://example.com/demo2',
    },
    {
      id: 3,
      title: 'Generador de informes',
      description: 'Genera informes de los alumnos en pdf con sus datos.',
      categorias: ['Destacados', 'Utilidades'],
      technologies: ['PHP', 'MySQL', 'PDFLib'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: 'https://github.com/PabloGD78/proyecto-pi',
      authors: ['Pablo GD'],
      executionUrl: 'https://example.com/demo3',
    },
    {
      id: 4,
      title: 'EUSA Quiz',
      description:
        'Una plataforma tipo Kahoot diseñada para el aprendizaje interactivo en clase.',
      categorias: ['Educación'],
      technologies: ['Angular', 'Firebase', 'Socket.io'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: '#',
      authors: ['Equipo Alpha'],
      executionUrl: '#',
    },
    {
      id: 5,
      title: 'Buzón Anónimo',
      description:
        'Comunicación segura y privada con filtros inteligentes de contenido.',
      categorias: ['Utilidades', 'Comunidad'],
      technologies: ['Node.js', 'Express', 'OpenAI API'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: '#',
      authors: ['Equipo Beta'],
      executionUrl: '#',
    },
    {
      id: 6,
      title: 'Muralia',
      description:
        'El mural digital definitivo para la gestión y visualización de eventos del campus.',
      categorias: ['Eventos', 'Comunidad'],
      technologies: ['React', 'PostgreSQL', 'Cloudinary'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: '#',
      authors: ['Equipo Gamma'],
      executionUrl: '#',
    },
    {
      id: 7,
      title: 'Sistema SCORM',
      description:
        'Implementación estandarizada para la gestión de paquetes de aprendizaje electrónico.',
      categorias: ['Educación', 'E-learning'],
      technologies: ['JavaScript', 'XML', 'PHP'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: '#',
      authors: ['Equipo Delta'],
      executionUrl: '#',
    },
  ];
}
