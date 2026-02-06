import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterDataService, CentroEducativo } from '../../../core/services/master-data.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-center-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationModalComponent],
  templateUrl: './center-management.component.html',
  styleUrls: ['./center-management.component.scss']
})
export class CenterManagementComponent implements OnInit {
  centros: CentroEducativo[] = [];
  
  // Modal State
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  centroForm: { id?: number; nombreCentro: string; sufijoEmail: string } = { nombreCentro: '', sufijoEmail: '' };

  // Status para el modal de borrado
  showDeleteModal = false;
  centerToDelete: CentroEducativo | null = null;

  constructor(
    private masterDataService: MasterDataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.cargarCentros();
  }

  cargarCentros() {
    this.masterDataService.getCentros().subscribe({
      next: (data) => this.centros = data,
      error: (err) => console.error('Error cargando centros', err)
    });
  }

  abrirModalCrear() {
    this.modoEdicion = false;
    this.centroForm = { nombreCentro: '', sufijoEmail: '' };
    this.mostrarModal = true;
  }

  abrirModalEditar(centro: CentroEducativo) {
    this.modoEdicion = true;
    this.centroForm = { 
      id: centro.id, 
      nombreCentro: centro.nombreCentro, 
      sufijoEmail: centro.sufijoEmail || '' 
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarCentro() {
    if (!this.centroForm.nombreCentro.trim()) {
      this.notificationService.showWarning('El nombre es obligatorio');
      return;
    }

    const request = this.modoEdicion
      ? this.masterDataService.updateCentro(this.centroForm.id!, { 
          nombreCentro: this.centroForm.nombreCentro, 
          sufijoEmail: this.centroForm.sufijoEmail 
        })
      : this.masterDataService.createCentro({ 
          nombreCentro: this.centroForm.nombreCentro, 
          sufijoEmail: this.centroForm.sufijoEmail 
        });

    request.subscribe({
      next: () => {
        this.notificationService.showSuccess(`Centro ${this.modoEdicion ? 'actualizado' : 'creado'} correctamente`);
        this.cargarCentros();
        this.cerrarModal();
      },
      error: (err) => {
        console.error(err);
        this.notificationService.showError('Error al guardar el centro');
      }
    });
  }

  confirmarEliminar(centro: CentroEducativo) {
    this.centerToDelete = centro;
    this.showDeleteModal = true;
  }

  cancelarEliminar() {
    this.showDeleteModal = false;
    this.centerToDelete = null;
  }

  ejecutarEliminar() {
    if (this.centerToDelete) {
      this.masterDataService.deleteCentro(this.centerToDelete.id!).subscribe({
        next: () => {
          this.notificationService.showSuccess('Centro eliminado correctamente');
          this.cargarCentros();
          this.cancelarEliminar();
        },
        error: (err) => {
          console.error(err);
          this.notificationService.showError('Error al eliminar el centro');
          this.cancelarEliminar();
        }
      });
    }
  }
}
