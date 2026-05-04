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
    user: any;

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.curso = this.cursos.find(c => c.id === id);

    if (!this.curso) {
      alert('Curso no encontrado');
    }
  }

  inscribirse() {

    if (!this.user.id) {
      alert('Debes iniciar sesión');
      return;
    }

    const historial = JSON.parse(localStorage.getItem('historial') || '[]');

    // ❌ evitar duplicados
    const existe = historial.find(
      (h: any) => h.userId === this.user.id && h.cursoId === this.curso.id
    );

    if (existe) {
      alert('Ya estás inscrito ❗');
      return;
    }

    // ✅ guardar inscripción
    const nuevo = {
      userId: this.user.id,
      cursoId: this.curso.id,
      curso: this.curso.titulo,
      fecha: new Date().toLocaleString(),
      progreso: 0,
      plan: this.user.plan || 'Gratis'
    };

      historial.push(nuevo);
    localStorage.setItem('historial', JSON.stringify(historial));

    alert('Inscripción guardada ✅');
  }

}