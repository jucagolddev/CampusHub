import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../../core/models/project';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  project?: Project;

  // Datos de prueba (idealmente vendrían de un servicio)
  private allProjects: Project[] = [
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
        'Una plataforma tipo Kahoot diseñada para el aprendizaje interactivo en clase desarrollada por alumnos de último curso.',
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
        'Un buzón donde los alumnos podrán dejar mensajes anónimos, con un evidente control y filtro para evitar insultos y falacias.',
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
        'Un mural digital diseñado para colgar eventos y noticias relevantes del campus, facilitando la comunicación entre alumnos.',
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
        'Un sistema de SCORM desarrollado por otros alumnos para estandarizar contenidos educativos e-learning.',
      categorias: ['Educación', 'E-learning'],
      technologies: ['JavaScript', 'XML', 'PHP'],
      image: 'assets/images/placeholder.jpg',
      textolink: 'Descubre mas sobre la aplicacion',
      githubLink: '#',
      authors: ['Equipo Delta'],
      executionUrl: '#',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.allProjects.find((p) => p.id === id);
  }
}
