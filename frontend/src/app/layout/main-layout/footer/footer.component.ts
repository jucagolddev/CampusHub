import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * El cierre de mi página (Footer).
 * Aquí pongo los típicos enlaces de contacto y el copyright para que la web
 * quede bien rematada abajo.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
