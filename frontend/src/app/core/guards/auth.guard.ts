import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * ==========================================
 * GUARDIA DE AUTENTICACIÓN (AuthGuard)
 * ==========================================
 * Protege las rutas que requieren que el usuario haya iniciado sesión.
 * Si el usuario no está autenticado, lo redirige al Login.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos si existe una sesión activa
  if (authService.isLoggedIn()) {
    return true;
  }

  // Si no está logueado, redirigir al login para forzar autenticación
  router.navigate(['/login']);
  return false;
};
