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

    // 🔒 SI NO HAY USER
    if (!this.user?.id) {

      alert('Debes iniciar sesión');

      return;
    }

    // 📚 GUARDAR INSCRIPCIÓN
    this.http.post(`${this.API}/inscribirse`, {

      user_id: this.user.id,
      curso_id: curso.id

    }).subscribe({

      next: (res: any) => {

        console.log('✅ INSCRIPCIÓN:', res);

        // 🚀 ENTRAR AL CURSO
        this.router.navigate(['/curso', curso.id]);
      },

      error: (err) => {

        console.error('❌ Error inscripción:', err);

        // AUN ASÍ ENTRA
        this.router.navigate(['/curso', curso.id]);
      }
    });
  }
}