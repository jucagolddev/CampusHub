import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Project } from '../models/project.model';

export interface ProjectData {
  nombreProyecto: string;
  descripcionProyecto: string;
  urlProyecto: string;
  urlGitHub: string;
  imgPortada: string;
}

/**
 * SERVICIO DE PROYECTOS (ProjectService)
 * -------------------------------------------------------------------------
 * Actúa como la capa de comunicación dedicada para la entidad de Proyectos.
 * Permite realizar peticiones HTTP seguras al backend para listar, filtrar
 * y obtener detalles técnicos de los trabajos publicados.
 * 
 * Implementa el manejo de cabeceras de autorización para operaciones de
 * creación que requieren un usuario logueado.
 */

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Genera las cabeceras con el token de autorización.
   * @private
   */
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Crea un nuevo proyecto.
   * @param project Datos del proyecto
   */
  createProject(project: ProjectData): Observable<any> {
    return this.http.post(this.apiUrl, project, { headers: this.getHeaders() });
  }

  /**
   * Obtiene la lista de todos los proyectos.
   * (Pública, no necesariamente requiere auth, pero el backend decidirá)
   */
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Obtiene los detalles de un proyecto específico por su ID.
   * @param id Identificador del proyecto.
   */
  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Elimina un proyecto por su ID.
   * @param id Identificador del proyecto.
   */
  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
