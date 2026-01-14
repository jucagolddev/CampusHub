import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Esta es mi puerta de entrada para usuarios registrados.
 * Aquí controlo el formulario de acceso, asegurándome de que las credenciales
 * pasen por mi servicio de autenticación antes de dejar pasar a nadie al sistema.
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

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Cuando el usuario me da sus datos y pulsa entrar, yo me encargo de todo.
   * Valido rápidamente que no me deje nada vacío y pido permiso al AuthService.
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
