import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  standalone: true,
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class CursosComponent {

  constructor(private router: Router) {}

  cursos = [
    {
      id: 1,
      titulo: 'Angular desde cero',
      descripcion: 'Aprende Angular paso a paso',
      precio: 0,
      rating: 5,
      emoji: '💻'
    },
    {
      id: 2,
      titulo: 'Data Science',
      descripcion: 'Análisis de datos',
      precio: 25,
      rating: 4,
      emoji: '📊'
    },
    {
      id: 3,
      titulo: 'Diseño UI',
      descripcion: 'Interfaces modernas',
      precio: 15,
      rating: 4,
      emoji: '🎨'
    }
  ];

  entrarCurso(curso: any) {
    alert('Entrando a ' + curso.titulo);

    // futuro:
    // this.router.navigate(['/curso', curso.id]);
  }

}