import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

/**
 * ==========================================
 * COMPONENTE DE DISEÑO: ADMIN LAYOUT
 * ==========================================
 * Este componente define la estructura visual para el panel de administración.
 * Incluye un sidebar lateral (navegación privada) y un área de contenido principal.
 */
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  // Estado que controla si la barra lateral está contraída o expandida
  isSidebarCollapsed = false;

  /**
   * Alterna la visibilidad del sidebar.
   * Utilizado para mejorar la experiencia en dispositivos móviles o pantallas pequeñas.
   */
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
