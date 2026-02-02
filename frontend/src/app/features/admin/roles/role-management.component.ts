import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe(u => this.users = u);
    this.http.get<any[]>('http://localhost:3000/api/roles').subscribe(r => this.roles = r);
  }

  assignRole() {
    if (!this.selectedUser || !this.selectedRole) return;

    this.http.post('http://localhost:3000/api/relations/assign-rol-user', {
      tokken: this.selectedUser.tokken,
      rolId: this.selectedRole
    }).subscribe({
      next: () => {
        alert('Rol asignado correctamente');
        this.selectedUser = null;
        this.selectedRole = null;
      },
      error: (err) => alert('Error al asignar rol')
    });
  }
}
