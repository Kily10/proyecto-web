import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso',
  standalone: true,
  templateUrl: './curso.html',
  styleUrls: ['./curso.css']
})
export class CursoComponent {

  curso: any;

  cursos = [
    {
      id: 1,
      titulo: 'Angular desde cero',
      descripcion: 'Aprende Angular paso a paso',
      precio: 0,
      rating: 5,
      emoji: '💻',
      temas: ['Componentes', 'Rutas', 'Servicios', 'HTTP']
    },
    {
      id: 2,
      titulo: 'Data Science',
      descripcion: 'Análisis de datos',
      precio: 25,
      rating: 4,
      emoji: '📊',
      temas: ['Python', 'Pandas', 'Gráficas']
    },
    {
      id: 3,
      titulo: 'Diseño UI',
      descripcion: 'Interfaces modernas',
      precio: 15,
      rating: 4,
      emoji: '🎨',
      temas: ['Figma', 'UX', 'Colores']
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.curso = this.cursos.find(c => c.id === id);
  }

  inscribirse() {
    alert('Te inscribiste en ' + this.curso.titulo);
  }

}