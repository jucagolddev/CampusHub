import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

/**
 * ==========================================
 * COMPONENTE DE LOGIN
 * ==========================================
 * Gestiona el formulario de acceso y comunica las credenciales al AuthService.
 * Realiza la validación básica de campos antes de enviar la petición.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // Credenciales del usuario
  // Utilizamos 'userName' para coincidir con la estructura del backend
  userName = '';
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
