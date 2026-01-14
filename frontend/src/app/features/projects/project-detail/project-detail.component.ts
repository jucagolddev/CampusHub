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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.allProjects.find((p) => p.id === id);
  }
}
