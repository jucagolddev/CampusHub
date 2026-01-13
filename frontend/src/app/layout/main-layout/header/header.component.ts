import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

/**
 * Componente de Cabecera (Header)
 * Gestiona la navegación principal y el estado visual de la sesión del usuario.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Indica si el usuario ha iniciado sesión actualmente
  isLoggedIn = false;
  // Almacena la suscripción al servicio de autenticación para evitar fugas de memoria
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Al inicializar el componente, nos suscribimos al flujo de autenticación.
    // Esto permite que el header reaccione instantáneamente cuando el usuario inicia o cierra sesión.
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  ngOnDestroy(): void {
    // Es fundamental limpiar la suscripción cuando el componente se destruye
    // para liberar recursos del navegador y prevenir comportamientos inesperados.
    this.authSubscription?.unsubscribe();
  }

  /**
   * Ejecuta el cierre de sesión a través del servicio de autenticación.
   */
  logout(): void {
    this.authService.logout();
  }
}

