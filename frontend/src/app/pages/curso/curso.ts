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

  cursos = [
    {
      id: 1,
      titulo: 'Angular desde cero',
      descripcion: 'Aprende Angular paso a paso',
      precio: 0,
      rating: 5,
      emoji: '💻',
      nivel: 'Gratis',
      temas: ['Componentes', 'Rutas', 'Servicios']
    },
    {
      id: 2,
      titulo: 'Python',
      descripcion: 'Programación desde cero',
      precio: 20,
      rating: 5,
      emoji: '🐍',
      nivel: 'Platino',
      temas: ['Variables', 'Funciones', 'Listas']
    },
    {
      id: 3,
      titulo: 'Data Science',
      descripcion: 'Análisis de datos',
      precio: 25,
      rating: 4,
      emoji: '📊',
      nivel: 'Gold',
      temas: ['Pandas', 'Gráficas', 'Modelos']
    },
    {
      id: 4,
      titulo: 'Diseño UI',
      descripcion: 'Interfaces modernas',
      precio: 30,
      rating: 4,
      emoji: '🎨',
      nivel: 'Diamante',
      temas: ['UX', 'Figma', 'Prototipos']
    }
  ];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.curso = this.cursos.find(c => c.id === id);

    if (!this.curso) {
      alert('Curso no encontrado');
    }
  }

  // 🔒 VALIDAR ACCESO SEGÚN PLAN
  puedeAcceder(): boolean {
    const plan = this.user.plan || 'Gratis';

    const niveles: any = {
      'Gratis': 1,
      'Platino': 2,
      'Gold': 3,
      'Diamante': 4
    };

    return niveles[plan] >= niveles[this.curso.nivel];
  }

  // 🔥 INSCRIPCIÓN REAL (BD)
  inscribirse() {

    if (!this.user.id) {
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