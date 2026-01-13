import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  /**
   * Verifica si existe un token en el localStorage
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Obtiene el estado actual de autenticación
   */
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Simula el login del usuario y guarda el token
   */
  login(email: string, password: string): void {
    // TODO: Implementar llamada real al backend
    // Por ahora, simulamos un login exitoso
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('userEmail', email);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Simula el registro del usuario
   */
  register(email: string, password: string, name: string): void {
    // TODO: Implementar llamada real al backend
    // Por ahora, simulamos un registro exitoso
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Obtiene el email del usuario actual
   */
  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  /**
   * Obtiene el nombre del usuario actual
   */
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }
}
