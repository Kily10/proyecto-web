import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router, private http: HttpClient) {}

  user: any;

  // 🔥 ahora vienen de la BD
  cursos: any[] = [];
  cursosOriginal: any[] = [];

  categoriaActual = 'all';

  private API = 'http://127.0.0.1:8000/api';

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    // 🔥 TRAER PLAN REAL DESDE BD
    if (this.user?.id) {
      this.http.get(`${this.API}/suscripcion/${this.user.id}`)
        .subscribe((res: any) => {
          if (res) {
            this.user.plan = res.plan;
            localStorage.setItem('user', JSON.stringify(this.user));
          }
        });
    }

    // 🔥 CURSOS DESDE BACKEND
    this.http.get(`${this.API}/cursos`)
      .subscribe((data: any) => {
        this.cursos = [...data];
        
        console.log('CURSOS FRONT:', this.cursos);
        this.cursosOriginal = data;
      });
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

    if (!curso?.nivel) return true;

    return niveles[plan] >= niveles[curso.nivel];
  }

  // 🔍 BUSCAR
  search(event: any) {
    const texto = event.target.value.toLowerCase();

    this.cursos = this.cursosOriginal.filter((curso: any) =>
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
        (curso: any) => curso.categoria === cat
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