import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

/**
 * Este es mi menú de navegación (Header).
 * Es el que siempre está arriba del todo, vigilando si el usuario está dentro
 * para mostrarle el botón de salir o el de entrar.
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
    // Justo al arrancar, me pego al servicio de autenticación para estar
    // siempre al tanto de si cambia el estado de la sesión.
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  ngOnDestroy(): void {
    // Por limpieza y para que el navegador no sufra, me desengancho al irme.
    this.authSubscription?.unsubscribe();
  }

  /**
   * Ejecuta el cierre de sesión a través del servicio de autenticación.
   */
  logout(): void {
    this.authService.logout();
  }
}
