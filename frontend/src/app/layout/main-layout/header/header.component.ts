import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',

})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isLoggedIn = isAuthenticated;
      }
    );
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción
    this.authSubscription?.unsubscribe();
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    this.authService.logout();
  }
}

