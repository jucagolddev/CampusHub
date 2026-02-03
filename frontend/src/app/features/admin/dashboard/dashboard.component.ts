import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * ==========================================
 * COMPONENTE DASHBOARD (Panel de Control)
 * ==========================================
 * Punto de entrada principal para al área de administración.
 * Presenta un resumen visual y acceso rápido a las funciones de gestión.
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {}
