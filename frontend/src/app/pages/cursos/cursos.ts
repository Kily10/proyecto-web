import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursos.html',
  styleUrls: ['./cursos.css']
})
export class CursosComponent implements OnInit {

  cursos: any[] = [];

  user: any;

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // 👤 OBTENER USER
    this.user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.obtenerCursos();
  }

  obtenerCursos(): void {

    this.http.get<any[]>(`${this.API}/cursos`)
      .subscribe({

        next: (data) => {

          console.log('📚 CURSOS:', data);

          this.cursos = data || [];

          // 🔥 REFRESH VISUAL
          this.cd.detectChanges();
        },

        error: (err) => {

          console.error('❌ Error cursos:', err);
        }
      });
  }

  entrarCurso(curso: any): void {
 
     if (!this.user?.id) {

       alert('Debes iniciar sesión');

      return;
    }

    // 🔥 PLAN DEL USER
    const plan = this.user?.plan || 'Gratis';

    // 🔥 NIVELES
    const niveles: any = {
      'Gratis': 1,
      'Platino': 2,
      'Gold': 3,
      'Diamante': 4
    };

  // 🔒 SI NO TIENE ACCESO
    if (niveles[plan] < niveles[curso.nivel]) {

      alert('🔒 Necesitas un plan mayor');

      return;
    }

   // 📚 INSCRIPCIÓN
    this.http.post(`${this.API}/inscribirse`, {

      user_id: this.user.id,
      curso_id: curso.id

    }).subscribe({

      next: () => {

        this.router.navigate(['/curso', curso.id]);
      },

      error: () => {

        this.router.navigate(['/curso', curso.id]);
      }
    });
  }
}