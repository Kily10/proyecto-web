import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  user: any;

  // 📚 CURSOS CON NIVELES
  cursos = [
    {
      id: 1,
      titulo: 'Angular desde cero',
      descripcion: 'Aprende Angular paso a paso',
      precio: 0,
      rating: 5,
      categoria: 'programacion',
      emoji: '💻',
      nivel: 'Gratis'
    },
    {
      id: 2,
      titulo: 'Python',
      descripcion: 'Programación desde cero',
      precio: 20,
      rating: 5,
      categoria: 'programacion',
      emoji: '🐍',
      nivel: 'Platino'
    },
    {
      id: 3,
      titulo: 'Data Science',
      descripcion: 'Análisis de datos',
      precio: 25,
      rating: 4,
      categoria: 'data',
      emoji: '📊',
      nivel: 'Gold'
    },
    {
      id: 4,
      titulo: 'Diseño UI/UX',
      descripcion: 'Interfaces modernas',
      precio: 30,
      rating: 4,
      categoria: 'diseno',
      emoji: '🎨',
      nivel: 'Diamante'
    }
  ];

  cursosOriginal = [...this.cursos];
  categoriaActual = 'all';

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  // 🔐 CONTROL DE ACCESO
  puedeAcceder(curso: any): boolean {

    const plan = this.user?.plan || 'Gratis';

    const niveles: any = {
      'Gratis': 1,
      'Platino': 2,
      'Gold': 3,
      'Diamante': 4
    };

    return niveles[plan] >= niveles[curso.nivel];
  }

  // 🔍 BUSCAR
  search(event: any) {
    const texto = event.target.value.toLowerCase();

    this.cursos = this.cursosOriginal.filter(curso =>
      curso.titulo.toLowerCase().includes(texto)
    );
  }

  // 🧩 FILTRAR
  filter(cat: string) {
    this.categoriaActual = cat;

    if (cat === 'all') {
      this.cursos = [...this.cursosOriginal];
    } else {
      this.cursos = this.cursosOriginal.filter(
        curso => curso.categoria === cat
      );
    }
  }

  // 📖 VER CURSO (CON BLOQUEO)
  verCurso(curso: any) {

    if (!this.puedeAcceder(curso)) {
      alert('Necesitas un plan mayor 🔒');
      return;
    }

    this.router.navigate(['/curso', curso.id]);
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}