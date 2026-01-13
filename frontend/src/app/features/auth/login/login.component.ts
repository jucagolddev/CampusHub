import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente de Inicio de Sesión (Login)
 * Gestiona el formulario de acceso, captura las credenciales del usuario
 * y coordina con el AuthService para validar la sesión.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Variables vinculadas al formulario mediante ngModel para captura de datos
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Procesa el envío del formulario.
   * Valida que los campos no estén vacíos antes de intentar el login.
   */
  onSubmit(): void {
    if (this.email && this.password) {
      // Llamamos al servicio para establecer la sesión (simulado)
      this.authService.login(this.email, this.password);
      
      // Una vez autenticado, redirigimos al usuario a la página de inicio.
      this.router.navigate(['/']);
    }
  }
}

