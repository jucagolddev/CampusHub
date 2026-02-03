import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * ==========================================
 * COMPONENTE MENSAJE DE ALERTA
 * ==========================================
 * Componente reutilizable para mostrar mensajes de estado simples (éxito/error).
 */
@Component({
  selector: 'app-alert-msg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-msg.component.html',

})
export class AlertMsgComponent {

}
