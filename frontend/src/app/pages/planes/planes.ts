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

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  suscribirse(plan: string) {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    // 🔥 actualizar plan en sesión
    user.plan = plan;
    localStorage.setItem('user', JSON.stringify(user));

    // 🔥 guardar en BD (historial)
    this.http.post(`${this.API}/historial`, {
      user_id: user.id,
      accion: 'Compró plan ' + plan
    }).subscribe({
      next: () => {
        alert('Suscripción activada: ' + plan + ' ✅');
      },
      error: () => {
        alert('Error al guardar ❌');
      }
    });

  }

}