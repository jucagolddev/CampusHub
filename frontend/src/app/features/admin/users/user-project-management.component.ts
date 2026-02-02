import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-project-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-project-management.component.html'
})
export class UserProjectManagementComponent implements OnInit {
  users: any[] = [];
  projects: any[] = [];
  userProjects: any[] = [];
  selectedUser: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe(u => this.users = u);
    this.http.get<any[]>('http://localhost:3000/api/projects').subscribe(p => this.projects = p);
  }

  onUserSelect() {
    if (this.selectedUser) {
      this.http.get<any[]>(`http://localhost:3000/api/relations/users/${this.selectedUser.tokken}/projects`)
        .subscribe(up => this.userProjects = up);
    } else {
      this.userProjects = [];
    }
  }

  isAssigned(projectId: number): boolean {
    return this.userProjects.some(p => p.id === projectId);
  }

  toggleAssignment(project: any, event: any) {
    const isChecked = event.target.checked;
    const body = { tokken: this.selectedUser.tokken, proyectoId: project.id };

    if (isChecked) {
      this.http.post('http://localhost:3000/api/relations/assign-project', body).subscribe({
        next: () => this.userProjects.push(project),
        error: () => {
          alert('Error al asignar proyecto');
          event.target.checked = false; // Revert
        }
      });
    } else {
      this.http.post('http://localhost:3000/api/relations/remove-project', body).subscribe({
        next: () => {
          this.userProjects = this.userProjects.filter(p => p.id !== project.id);
        },
        error: () => {
          alert('Error al desvincular proyecto');
          event.target.checked = true; // Revert
        }
      });
    }
  }
}
