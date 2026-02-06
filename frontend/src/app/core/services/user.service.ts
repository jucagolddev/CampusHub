import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Ajusta la URL base según tu entorno (environment.ts) o hardcodeada si no hay entorno definido aún
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  deleteUser(tokken: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${tokken}`);
  }

  // Gestión de Roles
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles`).pipe(
      map(roles => roles.filter(role => role.nombreGrupo !== 'Usuario'))
    );
  }

  assignRole(tokken: string, rolId: number): Observable<any> {
    // Usamos la nueva ruta profesionalizada en el backend
    return this.http.put(`${this.apiUrl}/users/${tokken}/rol`, { rolId });
  }

  removeRole(tokken: string, rolId: number): Observable<any> {
    // Por ahora mantenemos esta o la actualizamos si hay controlador para delete de rol
    return this.http.post(`${this.apiUrl}/relations/remove-rol-user`, { tokken, rolId });
  }

  // Gestión de Proyectos de Usuario
  getUserProjects(tokken: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/relations/users/${tokken}/projects`);
  }

  assignProject(tokken: string, proyectoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/relations/assign-project`, { tokken, proyectoId });
  }

  removeProject(tokken: string, proyectoId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/relations/remove-project`, { tokken, proyectoId });
  }
}
