import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notification" class="toast-container" [ngClass]="notification.type">
      <div class="toast-icon">
        <i class="fas" [ngClass]="{
          'fa-check-circle': notification.type === 'success',
          'fa-exclamation-circle': notification.type === 'error',
          'fa-info-circle': notification.type === 'info',
          'fa-exclamation-triangle': notification.type === 'warning'
        }"></i>
      </div>
      <div class="toast-message">{{ notification.message }}</div>
      <button class="toast-close" (click)="close()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `,
  styleUrls: ['./notification-toast.component.scss']
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  notification: Notification | null = null;
  private subscription: Subscription | null = null;
  private timeoutId: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(notification => {
      this.notification = notification;
      this.clearTimeout();
      this.timeoutId = setTimeout(() => this.close(), notification.duration);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.clearTimeout();
  }

  close() {
    this.notification = null;
    this.clearTimeout();
  }

  private clearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
