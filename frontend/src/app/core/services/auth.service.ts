import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio de Autenticación (AuthService)
 * Centraliza toda la lógica relacionada con el inicio de sesión, registro y gestión del estado del usuario.
 * Utiliza RxJS para permitir que otros componentes reaccionen a cambios en el estado de autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject que mantiene el estado actual de autenticación. 
  // Se inicializa comprobando si ya existe un token guardado.
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  // Observable público para que los componentes se suscriban al estado de autenticación de forma reactiva.
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  /**
   * Verifica de forma privada si existe un token de seguridad en el almacenamiento local.
   * @returns boolean - True si el token existe, False en caso contrario.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Obtiene el valor booleano actual del estado de autenticación sin necesidad de suscribirse.
   * Útil para comprobaciones puntuales en guards o lógica de componentes.
   */
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Procesa la solicitud de inicio de sesión.
   * Por ahora simula una respuesta exitosa guardando un token ficticio.
   * @param email - Correo del usuario
   * @param password - Contraseña
   */
  login(email: string, password: string): void {
    // NOTA: Aquí se integrará la llamada real a la API mediante HttpClient en el futuro.
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('userEmail', email);
    
    // Notificamos a todos los suscriptores que el usuario ya está autenticado.
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Crea una nueva cuenta de usuario en el sistema.
   * @param email - Correo del usuario
   * @param password - Contraseña elegida
   * @param name - Nombre del usuario
   */
  register(email: string, password: string, name: string): void {
    // NOTA: Integrar llamada POST al backend para persistencia real.
    localStorage.setItem('authToken', 'fake-jwt-token');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    
    // Activamos el estado de sesión tras el registro automático.
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Finaliza la sesión actual eliminando toda la información de seguridad y usuario del navegador.
   * Notifica a la aplicación que el usuario ha salido.
   */
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Notificamos el cambio de estado a False.
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
