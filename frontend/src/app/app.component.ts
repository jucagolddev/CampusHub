import { Component } from '@angular/core';

/**
 * Componente Raíz de la Aplicación (AppComponent)
 * Actúa como el punto de anclaje de Angular en el DOM y contenedor de nivel superior.
 * Gestiona el título global de la página y sirve como base para el enrutado.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Título oficial de la plataforma Campus Hub
  title = 'CampusHub';
}
