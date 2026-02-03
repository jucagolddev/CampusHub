import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/**
 * ==========================================
 * COMPONENTE DE DISEÑO: MAIN LAYOUT
 * ==========================================
 * Define la estructura visual para la parte pública de la aplicación.
 * Mantiene un Header y Footer consistentes en todas las páginas públicas.
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
