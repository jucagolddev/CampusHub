import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interfaces para tipado fuerte de respuestas API
export interface LoginResponse {
  message: string;
  token: string;
  user: {
    userName: string;
    email: string;
    rolId?: number;
  };
}

/**
 * SERVICIO DE AUTENTICACIÓN (AuthService)
 * -------------------------------------------------------------------------
 * Este servicio centraliza toda la lógica de seguridad y gestión de sesiones
 * del lado del cliente. Se encarga de la comunicación con el backend para
 * procesos de login y registro, gestionando el estado reactivo de la sesión
 * mediante RxJS y persistiendo los tokens JWT en el almacenamiento local.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';
  
  // Estado reactivo de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  // Estado reactivo del usuario actual
  private currentUserSubject = new BehaviorSubject<any>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // =================================================================
  // MÉTODOS PÚBLICOS DE API
  // =================================================================

  /**
   * Inicia sesión contra el backend.
   * @param userName Nombre de usuario
   * @param password Contraseña plana
   * @returns Observable con la respuesta del servidor
   */
  login(userName: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { userName, password }).pipe(
      tap((response: LoginResponse) => {
        // Al recibir éxito, guardamos la sesión
        this.setSession(response);
      })
    );
  }

  /**
   * Registra un nuevo usuario.
   * @param userData Objeto con userName, email, password, y opcionales (rolId, centroId, tituloId)
   * @returns Observable con respuesta
   */
  register(userData: { 
    userName: string; 
    email: string; 
    password: string;
    rolId?: number;
    centroId?: number;
    tituloId?: number;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap(() => {
        // Opcional: Auto-login tras registro o redirigir a login
      })
    );
  }

  /**
   * Cierra la sesión y limpia el almacenamiento local.
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    
    this.router.navigate(['/login']);
  }

  // =================================================================
  // MÉTODOS DE ESTADO Y UTILIDADES
  // =================================================================

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // =================================================================
  // MÉTODOS PRIVADOS
  // =================================================================

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserFromStorage(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('authToken', authResult.token);
    // Guardamos info básica del usuario para mostrar en UI
    localStorage.setItem('user', JSON.stringify(authResult.user));

    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(authResult.user);
  }
}
