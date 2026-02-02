import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/main-layout/header/header.component';
import { FooterComponent } from './layout/main-layout/footer/footer.component';

/**
 * Componente raíz (AppComponent) convertido a Standalone.
 * Gestiona la estructura base de la aplicación.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'CampusHub';
}
