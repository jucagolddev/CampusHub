import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  constructor(public authService: AuthService) {}

  onToggle() {
    this.toggle.emit();
  }

  logout() {
    this.authService.logout();
  }
}
