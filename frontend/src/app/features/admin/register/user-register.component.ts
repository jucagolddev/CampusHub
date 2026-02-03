import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: () => {
          this.notificationService.showSuccess('Usuario registrado correctamente');
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Error creating user:', err);
          this.notificationService.showError('Error al registrar usuario. Compruebe si el nombre de usuario ya existe.');
        }
      });
    }
  }
}
