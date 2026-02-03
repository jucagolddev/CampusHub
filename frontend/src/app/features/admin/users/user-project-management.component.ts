import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../../core/services/user.service';
import { ProjectService } from '../../../core/services/project.service';
import { NotificationService } from '../../../core/services/notification.service';

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

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.userService.getAllUsers().subscribe(u => this.users = u);
    this.projectService.getProjects().subscribe(p => this.projects = p);
  }

  onUserSelect() {
    if (this.selectedUser) {
      this.userService.getUserProjects(this.selectedUser.tokken)
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

    if (isChecked) {
      this.userService.assignProject(this.selectedUser.tokken, project.id).subscribe({
        next: () => {
          this.userProjects.push(project);
          this.notificationService.showSuccess(`Proyecto ${project.nombreProyecto} asignado`);
        },
        error: () => {
          this.notificationService.showError('Error al asignar proyecto');
          event.target.checked = false; // Revert
        }
      });
    } else {
      this.userService.removeProject(this.selectedUser.tokken, project.id).subscribe({
        next: () => {
          this.userProjects = this.userProjects.filter(p => p.id !== project.id);
          this.notificationService.showInfo(`Proyecto ${project.nombreProyecto} desvinculado`);
        },
        error: () => {
          this.notificationService.showError('Error al desvincular proyecto');
          event.target.checked = true; // Revert
        }
      });
    }
  }
}
