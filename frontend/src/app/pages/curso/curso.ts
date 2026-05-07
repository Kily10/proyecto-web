import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-curso',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './curso.html',
  styleUrls: ['./curso.css']
})
export class CursoComponent implements OnInit {

  curso: any = null;
  user: any;

  private API = 'http://127.0.0.1:8000/api';

  materiales: any = {

    Angular: {
      imagen: 'assets/Angular_curso.jfif',
      video: '',
      temas: [
        'Introducción a Angular',
        'Componentes standalone',
        'Rutas y navegación',
        'Proyecto práctico Angular'
      ]
    },

    Python: {
      imagen: 'assets/python_curso.jfif',
      video: '',
      temas: [
        'Introducción a Python',
        'Variables y tipos de datos',
        'Condicionales y ciclos',
        'Proyecto práctico Python'
      ]
    },

    PHP: {
      imagen: 'assets/PHP_curso.jfif',
      video: '',
      temas: [
        'Introducción a PHP',
        'Variables y funciones',
        'Formularios y validación',
        'Proyecto práctico PHP'
      ]
    },

    CSS: {
      imagen: 'assets/Css_curso.jfif',
      video: '',
      temas: [
        'Introducción a CSS',
        'Selectores y propiedades',
        'Flexbox y Grid',
        'Diseño responsive'
      ]
    }

  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.route.paramMap.subscribe(params => {

      const id = params.get('id');

      console.log('ID DEL CURSO:', id);

      if (!id) {
        alert('ID del curso no encontrado');
        return;
      }

      this.curso = null;
      this.cd.detectChanges();

      this.http.get(`${this.API}/cursos/${id}`)
        .subscribe({
          next: (data: any) => {

            console.log('CURSO CARGADO:', data);

            this.curso = data;

            const titulo = (this.curso.titulo || '').toLowerCase();

            if (titulo.includes('angular')) {

              this.aplicarMaterial('Angular');

            } else if (titulo.includes('python')) {

              this.aplicarMaterial('Python');

            } else if (titulo.includes('php')) {

              this.aplicarMaterial('PHP');

            } else if (titulo.includes('css')) {

              this.aplicarMaterial('CSS');

            } else {

              this.curso.imagen = 'assets/Angular.jfif';
              this.curso.video = '';
              this.curso.temas = [
                'Introducción',
                'Conceptos básicos',
                'Proyecto práctico'
              ];
            }

            this.cd.detectChanges();
          },

          error: (err) => {
            console.error('ERROR CURSO:', err);
            alert('Curso no encontrado ❌');
          }
        });

    });
  }

  aplicarMaterial(tipo: string): void {

    this.curso.imagen = this.materiales[tipo].imagen;
    this.curso.video = this.materiales[tipo].video;
    this.curso.temas = this.materiales[tipo].temas;
  }

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

  inscribirse(): void {

    if (!this.user?.id) {
      alert('Debes iniciar sesión');
      return;
    }

    if (!this.puedeAcceder()) {
      alert('Tu plan no permite este curso 🔒');
      return;
    }

    this.http.post(`${this.API}/inscribirse`, {
      user_id: this.user.id,
      curso_id: this.curso.id
    }).subscribe({
      next: () => {
        alert('Inscripción guardada en BD ✅');
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar ❌');
      }
    });
  }
}