import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso.html',
  styleUrls: ['./curso.css']
})
export class CursoComponent {

  curso: any;
  user: any;

  private API = 'http://127.0.0.1:8000/api';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    const id = this.route.snapshot.paramMap.get('id');

    // 🔥 AHORA DESDE BACKEND
    this.http.get(`${this.API}/cursos/${id}`)
      .subscribe({
        next: (data: any) => {
          this.curso = data;

          // 🔥 material de ejemplo (luego lo puedes traer de BD)
          this.curso.temas = [
            'Introducción',
            'Conceptos básicos',
            'Proyecto práctico'
          ];
        },
        error: () => {
          alert('Curso no encontrado ❌');
        }
      });
  }

  // 🔒 VALIDAR ACCESO SEGÚN PLAN
  puedeAcceder(): boolean {
    const plan = this.user?.plan || 'Gratis';

    const niveles: any = {
      'Gratis': 1,
      'Platino': 2,
      'Gold': 3,
      'Diamante': 4
    };

    if (!this.curso?.nivel) return true;

    return niveles[plan] >= niveles[this.curso.nivel];
  }

  // 🔥 INSCRIPCIÓN REAL (BD)
  inscribirse() {

    if (!this.user?.id) {
      alert('Debes iniciar sesión');
      return;
    }

    if (!this.puedeAcceder()) {
      alert('Tu plan no permite este curso 🔒');
      return;
    }

    this.http.post(`${this.API}/historial`, {
      user_id: this.user.id,
      accion: 'Se inscribió al curso ' + this.curso.titulo
    }).subscribe({
      next: () => {
        alert('Inscripción guardada en BD ✅');
      },
      error: () => {
        alert('Error al guardar ❌');
      }
    });
  }

}