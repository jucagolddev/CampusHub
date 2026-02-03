import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

/**
 * ==========================================
 * SERVICIO DE NOTIFICACIONES
 * ==========================================
 * Gestiona la comunicación de eventos globales a nivel de interfaz.
 * Permite emitir mensajes de éxito, error o advertencia desde cualquier componente.
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string, duration: number = 3000) {
    this.notificationSubject.next({ message, type: 'success', duration });
  }

  showError(message: string, duration: number = 4000) {
    this.notificationSubject.next({ message, type: 'error', duration });
  }

  showInfo(message: string, duration: number = 3000) {
    this.notificationSubject.next({ message, type: 'info', duration });
  }

  showWarning(message: string, duration: number = 3000) {
    this.notificationSubject.next({ message, type: 'warning', duration });
  }
}
