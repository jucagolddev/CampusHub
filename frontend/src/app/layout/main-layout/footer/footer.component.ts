import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * ==========================================
 * COMPONENTE FOOTER (Pie de Página)
 * ==========================================
 * Sección inferior visible en todas las páginas públicas.
 * Contiene información legal, enlaces de contacto y copyright.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
