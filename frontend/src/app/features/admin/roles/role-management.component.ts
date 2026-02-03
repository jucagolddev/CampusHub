import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-management.component.html'
})
export class RoleManagementComponent implements OnInit {
  users: any[] = [];
  roles: any[] = [];
  selectedUser: any = null;
  selectedRole: any = null;

  constructor(private userService: UserService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getAllUsers().subscribe(u => this.users = u);
    this.userService.getRoles().subscribe(r => this.roles = r);
  }

  assignRole() {
    if (!this.selectedUser || !this.selectedRole) return;

    this.userService.assignRole(this.selectedUser.tokken, this.selectedRole).subscribe({
      next: () => {
        this.notificationService.showSuccess('Rol asignado correctamente');
        this.loadData();
        this.selectedRole = null;
      },
      error: (err) => {
        console.error('Error assigning role:', err);
        if (err.status === 409) {
             this.notificationService.showWarning('El usuario ya tiene este rol asignado.');
        } else if (err.status === 500) {
             this.notificationService.showError('Error interno del servidor. Inténtelo más tarde.');
        } else {
             this.notificationService.showError('Error al asignar el rol. Inténtelo de nuevo.');
        }
      }
    });
  }

  removeRole(roleName: string) {
    if (!this.selectedUser) return;
    
    const role = this.roles.find(r => r.nombreGrupo === roleName);
    if (!role) {
      this.notificationService.showError('Error: No se pudo identificar el rol');
      return;
    }

    if (confirm(`¿Estás seguro de quitar el rol ${roleName} a ${this.selectedUser.userName}?`)) {
      this.userService.removeRole(this.selectedUser.tokken, role.id).subscribe({
        next: () => {
          this.loadData();
          this.selectedUser.roles = this.selectedUser.roles.filter((r: string) => r !== roleName);
          this.notificationService.showSuccess(`Rol ${roleName} eliminado correctamente`);
        },
        error: (err) => {
             console.error('Error removing role:', err);
             this.notificationService.showError('Error al desvincular el rol');
        }
      });
    }
  }
}
