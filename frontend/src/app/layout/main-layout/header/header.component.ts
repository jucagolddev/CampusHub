import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

/**
 * ==========================================
 * COMPONENTE HEADER (Barra de Navegación Superior)
 * ==========================================
 * Elemento de navegación global visible en el layout principal.
 * Gestiona la visualización de enlaces según el estado de autenticación (Login/Logout).
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
  isAdmin = false;
  userName: string | null = null;
  
  // Almacena la suscripción al servicio de autenticación para evitar fugas de memoria
  private authSubscription?: Subscription;
  private userSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  /**
   * Inicialización del componente.
   * Nos suscribimos al estado de autenticación para actualizar la UI en tiempo real.
   */
  ngOnInit(): void {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );

    this.userSubscription = this.authService.currentUser$.subscribe(
      (user) => {
        this.userName = user ? user.userName : null;
        this.isAdmin = this.authService.isAdmin();
      }
    );
  }

  /**
   * Limpieza de recursos al destruir el componente.
   * Cancelamos las suscripciones para prevenir memory leaks.
   */
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

  /**
   * Ejecuta el cierre de sesión a través del servicio de autenticación.
   */
  logout(): void {
    this.authService.logout();
  }
}
