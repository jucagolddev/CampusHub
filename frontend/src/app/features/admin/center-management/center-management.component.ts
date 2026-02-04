import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MasterDataService, CentroEducativo } from '../../../core/services/master-data.service';

@Component({
  selector: 'app-center-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './center-management.component.html',
  // Reutilizamos estilos globales o definimos específicos si es necesario
  styles: [`
    .pagina-gestion { padding: 2rem; }
    .header-gestion { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .tabla-container { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
    .tabla-datos { width: 100%; border-collapse: collapse; }
    .tabla-datos th, .tabla-datos td { padding: 1rem; text-align: left; border-bottom: 1px solid #eee; }
    .tabla-datos th { background-color: #f8f9fa; font-weight: 600; color: #333; }
    .acciones { display: flex; gap: 0.5rem; }
    .btn-icon { background: none; border: none; cursor: pointer; padding: 0.5rem; border-radius: 4px; transition: background 0.2s; }
    .btn-icon.editar { color: #3b82f6; }
    .btn-icon.editar:hover { background: #eff6ff; }
    .btn-icon.eliminar { color: #ef4444; }
    .btn-icon.eliminar:hover { background: #fef2f2; }
    .alerta-flotante { padding: 1rem; border-radius: 4px; margin-bottom: 1rem; }
    .alerta-exito { background-color: #d1fae5; color: #065f46; }
    .alerta-error { background-color: #fee2e2; color: #991b1b; }
    
    /* Modal Styles */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-contenido { background: white; border-radius: 8px; width: 100%; max-width: 500px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .modal-header { padding: 1.5rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
    .modal-body { padding: 1.5rem; }
    .modal-footer { padding: 1.5rem; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 1rem; }
    .btn-cerrar { background: none; border: none; font-size: 1.5rem; cursor: pointer; }
    .grupo-input { margin-bottom: 1rem; }
    .grupo-input label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
    .grupo-input input { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
    
    /* Botones */
    .boton-primario { background-color: #0088cc; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 500; }
    .boton-primario:hover { background-color: #0077b3; }
    
    .boton-secundario { background-color: white; color: #dc2626; border: 1px solid #dc2626; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .boton-secundario:hover { background-color: #dc2626; color: white; }
  `]
})
export class CenterManagementComponent implements OnInit {
  centros: CentroEducativo[] = [];
  
  // Modal State
  mostrarModal: boolean = false;
  modoEdicion: boolean = false;
  centroForm: { id?: number; nombreCentro: string; sufijoEmail: string } = { nombreCentro: '', sufijoEmail: '' };

  // Feedback
  mensaje: string = '';
  tipoMensaje: 'exito' | 'error' = 'exito';

  constructor(private masterDataService: MasterDataService) {}

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
      this.mostrarFeedback('El nombre es obligatorio', 'error');
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
        this.mostrarFeedback(
          `Centro ${this.modoEdicion ? 'actualizado' : 'creado'} correctamente`, 
          'exito'
        );
        this.cargarCentros();
        this.cerrarModal();
      },
      error: (err) => {
        console.error(err);
        this.mostrarFeedback('Error al guardar el centro', 'error');
      }
    });
  }

  confirmarEliminar(centro: CentroEducativo) {
    if (confirm(`¿Estás seguro de eliminar el centro "${centro.nombreCentro}"?`)) {
      this.masterDataService.deleteCentro(centro.id).subscribe({
        next: () => {
          this.mostrarFeedback('Centro eliminado correctamente', 'exito');
          this.cargarCentros();
        },
        error: (err) => {
          console.error(err);
          this.mostrarFeedback('Error al eliminar el centro', 'error');
        }
      });
    }
  }

  mostrarFeedback(texto: string, tipo: 'exito' | 'error') {
    this.mensaje = texto;
    this.tipoMensaje = tipo;
    setTimeout(() => this.mensaje = '', 4000);
  }
}
