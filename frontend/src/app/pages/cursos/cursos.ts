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

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.obtenerCursos();
  }

  obtenerCursos(): void {

    this.http.get<any[]>(`${this.API}/cursos`)
      .subscribe({

        next: (data) => {

          console.log('📚 CURSOS:', data);

          this.cursos = data || [];

          // 🔥 FORZAR REFRESH VISUAL
          this.cd.detectChanges();
        },

        error: (err) => {

          console.error('❌ Error cursos:', err);
        }
      });
  }

  entrarCurso(curso: any): void {

    this.router.navigate(['/curso', curso.id]);
  }
}