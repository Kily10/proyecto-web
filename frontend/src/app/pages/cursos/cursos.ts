import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  Router,
  RouterModule
} from '@angular/router';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cursos',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

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

          this.cd.detectChanges();
        },

        error: (err) => {

          console.error('❌ Error cursos:', err);
        }
      });
  }

  puedeAcceder(nivelCurso: string): boolean {

    const plan = this.user?.plan || 'Gratis';

    const niveles: any = {
      'Gratis': 1,
      'Platino': 2,
      'Gold': 3,
      'Diamante': 4
    };

    return niveles[plan] >= niveles[nivelCurso || 'Gratis'];
  }

  entrarCurso(curso: any): void {

    if (!this.user?.id) {

      alert('Debes iniciar sesión');

      return;
    }

    if (!this.puedeAcceder(curso.nivel)) {

      alert('🔒 Necesitas un plan mayor');

      return;
    }

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