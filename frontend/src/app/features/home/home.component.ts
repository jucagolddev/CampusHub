import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Asegúrate de tener este archivo creado
})
export class HomeComponent {

  // Datos ficticios basados en vuestro ERD
  proyectos: Project[] = [
    {
      nombre: 'Campus Hub',
      descripcion: 'Repositorio de proyectos para alumnos.',
      imgPortada: 'https://via.placeholder.com/300x180',
      modulo: 'Proyecto Integrado',
      autor: 'Grupo 1'
    },
    {
      nombre: 'Gestor de Tareas',
      descripcion: 'App para organizar sprints de desarrollo.',
      imgPortada: 'https://via.placeholder.com/300x180',
      modulo: 'Entornos de Desarrollo',
      autor: 'Juan Pérez'
    },
    {
      nombre: 'E-commerce API',
      descripcion: 'Backend completo para una tienda online.',
      imgPortada: 'https://via.placeholder.com/300x180',
      modulo: 'Programación',
      autor: 'Ana López'
    }
  ];

  constructor() { }

  // MÉTODO PLACEHOLDER PARA EL BUSCADOR
  buscarProyecto(termino: string) {
    console.log('Buscando:', termino);
    // TODO: Implementar lógica de filtrado con el ProjectService más adelante
  }
}