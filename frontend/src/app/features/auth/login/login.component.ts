import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

/**
 * COMPONENTE DE LOGIN
 * Gestiona el formulario y comunica las credenciales al AuthService.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Variables vinculadas al formulario
  // NOTA: El backend espera 'userName', pero el HTML original usaba 'email' o 'gmail'.
  // Al migrar, debemos asegurar que coincidan. Usaremos 'userName' como campo genérico (puede ser usuario o email si el backend lo soporta).
  // Según backend actual: userController busca por 'userName'.
  userName = ''; // Cambiado de email a userName para coincidir con backend
  password = '';
  
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    // Limpiar errores previos
    this.errorMessage = null;

    if (this.userName && this.password) {
      this.isLoading = true;

      // Suscripción al observable del servicio
      this.authService.login(this.userName, this.password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.isLoading = false;
          
          // Redirección condicional según rol
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err) => {
          console.error('Error de login:', err);
          this.isLoading = false;
          // Manejo básico de errores
          if (err.status === 401 || err.status === 404) {
             this.errorMessage = 'Usuario o contraseña incorrectos.';
          } else {
             this.errorMessage = 'Ocurrió un error en el servidor. Inténtalo más tarde.';
          }
        }
      });
    } else {
        this.errorMessage = 'Por favor completa todos los campos.';
    }
  }
}
