import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.html',
  styleUrls: ['./planes.css']
})
export class PlanesComponent {

  user: any;
  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  // 💳 PAGO + SUSCRIPCIÓN REAL
  suscribirse(plan: string) {

    if (!this.user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    this.http.post(`${this.API}/pago`, {
      user_id: this.user.id,
      plan: plan
    }).subscribe({
      next: (res: any) => {

        // 🔥 actualizar plan en frontend
        this.user.plan = res.suscripcion.plan;
        localStorage.setItem('user', JSON.stringify(this.user));

        // 🔥 guardar en historial
        this.http.post(`${this.API}/historial`, {
          user_id: this.user.id,
          accion: 'Pagó y activó plan ' + plan
        }).subscribe();

        alert('Pago realizado 💳✅ Plan: ' + plan);
      },
      error: () => {
        alert('Error en el pago ❌');
      }
    });

  }

}