import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

/**
 * ==========================================
 * COMPONENTE SIDEBAR (Navegación Lateral)
 * ==========================================
 * Menú de navegación principal para el área de administración.
 * Permite alternar su estado (expandido/colapsado) y cerrar sesión.
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  // Propiedad que recibe el estado de colapso desde el componente padre
  @Input() isCollapsed = false;
  
  // Evento que notificamos al padre cuando el usuario quiere alternar el sidebar
  @Output() toggle = new EventEmitter<void>();

  constructor(public authService: AuthService) {}

  /**
   * Emite el evento de alternancia del sidebar.
   */
  onToggle() {
    this.toggle.emit();
  }

  /**
   * Cierra la sesión del usuario actual.
   */
  logout() {
    this.authService.logout();
  }
}
