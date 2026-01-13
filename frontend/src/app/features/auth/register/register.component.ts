import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Componente de Registro (Register)
 * Gestiona la creación de nuevas cuentas de usuario, incluyendo validaciones básicas
 * de formulario y coordinación con el AuthService.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  // Datos del nuevo perfil vinculados mediante ngModel
  nombre = '';
  apellidos = '';
  username = '';
  email = '';
  password = '';
  repeatPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Procesa la solicitud de registro.
   * Verifica la igualdad de contraseñas y que todos los campos obligatorios estén rellenos.
   */
  onSubmit(): void {
    // Verificación de seguridad básica: coincidencia de contraseñas
    if (this.password !== this.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validación de campos obligatorios
    if (this.nombre && this.apellidos && this.username && this.email && this.password) {
      const fullName = `${this.nombre} ${this.apellidos}`;
      
      // Llamada al servicio para persistir el nuevo usuario
      this.authService.register(this.email, this.password, fullName);
      
      // Redirección automática al inicio tras el registro exitoso
      this.router.navigate(['/']);
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}

