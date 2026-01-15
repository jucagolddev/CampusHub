import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterDataService } from '../../../core/services/master-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center-registration.component.html'
})
export class CenterRegistrationComponent {
  nombreCentro: string = '';
  sufijoEmail: string = '';
  
  // Feedback visual
  mensaje: string = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(
    private masterDataService: MasterDataService,
    private router: Router
  ) {}

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

  mostrarMensaje(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 5000);
  }
}
