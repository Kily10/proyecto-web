import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  // 📚 LISTA DE CURSOS
  cursos = [
    {
      id: 1,
      titulo: 'Angular desde cero',
      descripcion: 'Aprende a crear aplicaciones web modernas',
      precio: 0,
      rating: 5,
      categoria: 'programacion',
      emoji: '💻'
    },
    {
      id: 2,
      titulo: 'Data Science',
      descripcion: 'Análisis de datos con Python',
      precio: 25,
      rating: 4,
      categoria: 'data',
      emoji: '📊'
    },
    {
      id: 3,
      titulo: 'Diseño UI/UX',
      descripcion: 'Crea interfaces atractivas',
      precio: 15,
      rating: 4,
      categoria: 'diseno',
      emoji: '🎨'
    },
    {
      id: 4,
      titulo: 'Laravel Backend',
      descripcion: 'Desarrolla APIs con Laravel',
      precio: 20,
      rating: 5,
      categoria: 'programacion',
      emoji: '⚙️'
    }
  ];

  // 🔥 COPIA ORIGINAL PARA FILTRAR
  cursosOriginal = [...this.cursos];

  categoriaActual = 'all';
  ngOnInit() {
  this.cargarCursos();
  }

   cargarCursos() {
   this.cursos = [...this.cursos];
  }

  // 🔍 BUSCAR
  search(event: any) {
    const texto = event.target.value.toLowerCase();

    this.cursos = this.cursosOriginal.filter(curso =>
      curso.titulo.toLowerCase().includes(texto)
    );
  }

  // 🧩 FILTRAR POR CATEGORÍA
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

  // 📖 VER CURSO
  verCurso(curso: any) {
    alert('Entrando al curso: ' + curso.titulo);

    // luego puedes hacer:
    // this.router.navigate(['/curso', curso.id]);
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}