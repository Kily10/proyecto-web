import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],  
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
      titulo: 'Python para todos',
      descripcion: 'Introducción a Python',
      precio: 20,
      rating: 4,
      emoji: '🐍'
    },

    {
      id: 3,
      titulo: 'Data Science',
      descripcion: 'Análisis de datos',
      precio: 25,
      rating: 4,
      emoji: '📊'
    },
    {
      id: 4,
      titulo: 'Diseño UI',
      descripcion: 'Interfaces modernas',
      precio: 30,
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