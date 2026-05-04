import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class HistorialComponent {

  historial: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const data = JSON.parse(localStorage.getItem('historial') || '[]');

    // 🔴 validación
    if (!user.id) {
      alert('Debes iniciar sesión');
      this.router.navigate(['/']);
      return;
    }

    // 🔥 filtrar por usuario
    this.historial = data.filter((h: any) => h.userId === user.id);
  }

  // 🚀 IR AL CURSO
  irCurso(id: number) {
    this.router.navigate(['/curso', id]);
  }

  // 🗑️ OPCIONAL: ELIMINAR CURSO
  eliminar(index: number) {
    const data = JSON.parse(localStorage.getItem('historial') || '[]');

    data.splice(index, 1);

    localStorage.setItem('historial', JSON.stringify(data));

    this.historial.splice(index, 1);
  }

}