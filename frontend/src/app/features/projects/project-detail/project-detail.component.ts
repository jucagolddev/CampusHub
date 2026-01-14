import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Project } from '../../../core/models/project';

/**
 * ¡Esta es mi vista de detalle!
 * Aquí es donde el usuario llega tras hacer clic en una tarjeta para conocer a fondo un proyecto.
 * Me encargo de capturar el ID de la URL y buscar el proyecto correspondiente en mi lista.
 */
@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  // Aquí guardo el proyecto que he encontrado. Si no existe, Angular lo manejará como undefined.
  project?: Project;

  // De nuevo, uso mi lista de proyectos para simular la base de datos.
  private allProjects: Project[] = [
    // ... listado de proyectos con sus detalles extendidos (authors, githubLink, etc.)
  ];

  constructor(private route: ActivatedRoute) {}

  /**
   * Al iniciar, leo el ID de la ruta activa.
   * Es la clave que uso para "pescar" el proyecto correcto de mi colección.
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.allProjects.find((p) => p.id === id);
  }
}
