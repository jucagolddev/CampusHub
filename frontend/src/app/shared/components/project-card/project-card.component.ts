import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Project } from '../../../core/models/project';
import { AuthService } from '../../../core/services/auth.service';
import { ProjectService } from '../../../core/services/project.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

/**
 * ==========================================
 * COMPONENTE TARJETA DE PROYECTO
 * ==========================================
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmationModalComponent],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Output() projectDeleted = new EventEmitter<void>();

  isAdmin = false;
  showDeleteModal = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  /**
   * Manejador de clic en la tarjeta.
   */
  ejecutarProyecto(event: Event): void {
    if (
      (event.target as HTMLElement).tagName === 'A' ||
      (event.target as HTMLElement).closest('a') ||
      (event.target as HTMLElement).closest('button')
    ) {
      return;
    }

    if (this.project.executionUrl) {
      window.open(this.project.executionUrl, '_blank');
    }
  }

  /**
   * Abre el modal de confirmación.
   */
  abrirConfirmacionBorrado(event: Event): void {
    event.stopPropagation();
    this.showDeleteModal = true;
  }

  /**
   * Cierra el modal de confirmación.
   */
  cancelarBorrado(): void {
    this.showDeleteModal = false;
  }

  /**
   * Ejecuta la eliminación tras confirmar en el modal.
   */
  confirmarBorrado(): void {
    if (this.project.id) {
      this.projectService.deleteProject(this.project.id).subscribe({
        next: () => {
          this.notificationService.showSuccess(`Proyecto "${this.project.title}" eliminado.`);
          this.projectDeleted.emit();
          this.showDeleteModal = false;
        },
        error: (err) => {
          console.error('Error al eliminar proyecto:', err);
          this.notificationService.showError('No se pudo eliminar el proyecto.');
          this.showDeleteModal = false;
        }
      });
    }
  }
}
