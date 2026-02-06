import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

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
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  
  // Estado para el modal de confirmación
  showDeleteModal = false;
  userToDelete: any = null;

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

  /**
   * Inicia el proceso de eliminación abriendo el modal.
   */
  startDeleteProcess(user: any) {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  /**
   * Cancela el proceso de eliminación.
   */
  cancelDelete() {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  /**
   * Ejecuta la eliminación tras confirmar en el modal.
   */
  confirmDelete() {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.tokken).subscribe(
        () => {
          this.notificationService.showSuccess('Usuario eliminado correctamente');
          this.users = this.users.filter(u => u.tokken !== this.userToDelete.tokken);
          this.cancelDelete(); // Cierra el modal y limpia el estado
        },
        error => {
          console.error('Error deleting user', error);
          this.notificationService.showError('Error al eliminar usuario');
          this.cancelDelete();
        }
      );
    }
  }
}
