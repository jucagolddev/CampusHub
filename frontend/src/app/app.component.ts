import { Component } from '@angular/core';

/**
 * Este es mi componente raíz (AppComponent).
 * Es el punto donde Angular se engancha al HTML y me permite empezar a montar
 * toda la estructura de CampusHub, manejando el título global y el enrutado.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // El nombre oficial que he elegido para mi plataforma.
  title = 'CampusHub';
}
