import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

/**
 * ¡Aquí es donde nacen mis nuevos usuarios!
 * Gestiono el proceso de registro, asegurándome de que los datos estén completos
 * y que las contraseñas coincidan antes de darles la bienvenida oficial.
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

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Me pongo en marcha en cuanto el usuario le da al botón de registrarse.
   * Hago unas comprobaciones de seguridad rápidas y, si todo está OK,
   * creo la nueva cuenta a través de mi AuthService.
   */
  onSubmit(): void {
    // Verificación de seguridad básica: coincidencia de contraseñas
    if (this.password !== this.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validación de campos obligatorios
    if (
      this.nombre &&
      this.apellidos &&
      this.username &&
      this.email &&
      this.password
    ) {
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
