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
  user: any = null;

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {

    const stored = localStorage.getItem('user');

    if (!stored) {
      console.warn('⚠ No hay usuario en localStorage');
      return;
    }

    try {
      this.user = JSON.parse(stored);
    } catch (e) {
      console.error('❌ Error parseando user');
      return;
    }

    if (!this.user || !this.user.id) {
      console.warn('⚠ Usuario inválido');
      return;
    }

    this.cargarHistorial();
  }

  cargarHistorial() {
    this.http.get(`${this.API}/historial/${this.user.id}`)
      .subscribe({
        next: (res: any) => {
          console.log('📊 HISTORIAL:', res);
          this.historial = Array.isArray(res) ? res : [];
        },
        error: (err) => {
          console.error('❌ Error historial:', err);
          this.historial = [];
        }
      });
  }
}