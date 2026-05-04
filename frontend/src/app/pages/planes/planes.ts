import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planes.html',
  styleUrls: ['./planes.css']
})
export class PlanesComponent {

  suscribirse(plan: string) {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    // 🔥 guardar plan actual
    user.plan = plan;
    localStorage.setItem('user', JSON.stringify(user));

    // 🔥 guardar en historial
    const historial = JSON.parse(localStorage.getItem('historial') || '[]');

    historial.push({
      userId: user.id,
      tipo: 'suscripcion',
      plan: plan,
      fecha: new Date().toLocaleString()
    });

    localStorage.setItem('historial', JSON.stringify(historial));

    alert('Suscripción activada: ' + plan);
  }

}