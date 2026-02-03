import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterDataService } from '../../../core/services/master-data.service';
import { Router } from '@angular/router';

/**
 * ==========================================
 * COMPONENTE REGISTRO DE CENTROS
 * ==========================================
 * Permite a los administradores dar de alta nuevos centros educativos
 * en el sistema, definiendo su nombre y sufijo de email corporativo.
 */
@Component({
  selector: 'app-center-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center-registration.component.html'
})
export class CenterRegistrationComponent {
  nombreCentro: string = '';
  sufijoEmail: string = '';
  
  // Control de feedback visual para el usuario
  mensaje: string = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(
    private masterDataService: MasterDataService,
    private router: Router
  ) {}

  /**
   * Procesa el formulario de alta de nuevo centro.
   */
  onSubmit(): void {
    if (!this.nombreCentro.trim()) {
      this.mostrarMensaje('El nombre del centro es obligatorio', 'error');
      return;
    }

    this.masterDataService.createCentro({
      nombreCentro: this.nombreCentro,
      sufijoEmail: this.sufijoEmail || undefined
    }).subscribe({
      next: (res) => {
        this.mostrarMensaje('Centro registrado exitosamente', 'exito');
        this.nombreCentro = '';
        this.sufijoEmail = '';
      },
      error: (err) => {
        console.error(err);
        const msg = err.error?.error || 'Error al registrar el centro';
        this.mostrarMensaje(msg, 'error');
      }
    });
  }

  /**
   * Muestra notificaciones temporales en la interfaz.
   */
  mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 5000);
  }
}
