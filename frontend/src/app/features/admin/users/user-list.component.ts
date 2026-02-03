import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';

/**
 * ==========================================
 * COMPONENTE LISTADO DE USUARIOS
 * ==========================================
 * Muestra el directorio completo de usuarios registrados.
 * Permite copiar el token de acceso para depuración o gestión.
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }

  /**
   * Utilidad para copiar el token UUID al portapapeles.
   */
  copyToken(token: string) {
    navigator.clipboard.writeText(token).then(() => {
      this.notificationService.showInfo('Token copiado al portapapeles');
    });
  }
}
