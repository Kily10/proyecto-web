import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule],
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

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // 🔴 validación básica
    if (!user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    const historial = JSON.parse(localStorage.getItem('historial') || '[]');

    // 🔥 EVITAR DUPLICADOS
    const existe = historial.find(
      (h: any) => h.userId === user.id && h.cursoId === this.curso.id
    );

    if (existe) {
      alert('Ya estás inscrito en este curso ❗');
      return;
    }

    // ✅ NUEVO REGISTRO
    const nuevo = {
      userId: user.id,
      cursoId: this.curso.id,
      curso: this.curso.titulo,
      fecha: new Date().toLocaleString(),
      progreso: 0,
      plan: user.plan || 'Gratis'
    };

    historial.push(nuevo);

    localStorage.setItem('historial', JSON.stringify(historial));

    alert('Inscripción guardada ✅');
  }

}