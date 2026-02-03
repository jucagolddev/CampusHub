import { CanActivateFn } from '@angular/router';

/**
 * ==========================================
 * GUARDIA DE ROLES (RoleGuard)
 * ==========================================
 * [PENDIENTE DE IMPLEMENTACIÓN]
 * Destinado a proteger rutas basándose en el rol del usuario (Admin, Gestor, etc.).
 * Actualmente permite todo el acceso por defecto.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  // TODO: Implementar lógica de verificación de roles
  return true;
};
