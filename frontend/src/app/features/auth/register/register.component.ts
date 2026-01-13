import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',

})
export class RegisterComponent {
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
   * Maneja el envío del formulario de registro
   */
  onSubmit(): void {
    // Validar que las contraseñas coincidan
    if (this.password !== this.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validar que todos los campos estén completos
    if (this.nombre && this.apellidos && this.username && this.email && this.password) {
      const fullName = `${this.nombre} ${this.apellidos}`;
      this.authService.register(this.email, this.password, fullName);
      // Redirigir al home después del registro
      this.router.navigate(['/']);
    } else {
      alert('Por favor, completa todos los campos');
    }
  }
}

