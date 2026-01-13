import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',

})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Maneja el envío del formulario de login
   */
  onSubmit(): void {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password);
      // Redirigir al home después del login
      this.router.navigate(['/']);
    }
  }
}

