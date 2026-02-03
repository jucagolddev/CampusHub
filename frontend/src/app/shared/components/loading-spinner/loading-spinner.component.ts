import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ==========================================
 * COMPONENTE SPINNER DE CARGA
 * ==========================================
 * Indicador visual de actividad en progreso.
 * Se utiliza para mejorar la UX durante operaciones asíncronas.
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',

})
export class LoadingSpinnerComponent {

}
