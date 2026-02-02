import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/api/users').subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }

  copyToken(token: string) {
    navigator.clipboard.writeText(token).then(() => {
      alert('Token copiado al portapapeles');
    });
  }
}
