import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotificationToastComponent } from './shared/components/notification-toast/notification-toast.component';

/**
 * ==========================================
 * COMPONENTE RAÍZ (Root Component)
 * ==========================================
 * Este es el contenedor principal de la aplicación.
 * Se encarga de alojar el <router-outlet> para la navegación y componentes globales
 * como las notificaciones (Toasts).
 */
@Component({
  selector: 'app-root',
  standalone: true, // Indica que no depende de un NgModule
  imports: [
    CommonModule, 
    RouterModule, // Necesario para el enrutamiento (<router-outlet>)
    NotificationToastComponent // Componente global de notificaciones
  ], 
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'CampusHub';
}
