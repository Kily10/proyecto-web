import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class HistorialComponent {

  historial: any[] = [];
  user: any;

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.user?.id) {
      console.warn('⚠ No hay usuario en sesión');
      return;
    }

    this.http.get(`${this.API}/historial/${this.user.id}`)
      .subscribe({
        next: (data: any) => {
          console.log('📊 HISTORIAL:', data);
          this.historial = data || [];
        },
        error: (err) => {
          console.error('❌ Error historial:', err);
        }
      });
  }
}