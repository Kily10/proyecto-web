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

  suscribirse(plan: string) {

    if (!this.user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    this.http.post(`${this.API}/suscripcion`, {
      user_id: this.user.id,
      plan: plan
    }).subscribe({
      next: () => {

        // 🔥 actualizar usuario local
        this.user.plan = plan;
        localStorage.setItem('user', JSON.stringify(this.user));

        // 🔥 guardar historial
        this.http.post(`${this.API}/historial`, {
          user_id: this.user.id,
          accion: 'Se suscribió al plan ' + plan
        }).subscribe();

        alert('Plan activado: ' + plan + ' ✅');
      },
      error: () => {
        alert('Error al suscribirse ❌');
      }
    });

  }

}