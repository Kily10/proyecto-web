
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {

  cursos: any[] = [];

  titulo = '';
  descripcion = '';
  categoria = '';

  // 🔥 SOLO 3 NIVELES
  nivel = 'Platino';

  emoji = '';
  precio = 0;
  rating = 5;

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.obtenerCursos();
  }

  obtenerCursos(): void {

    this.http.get<any[]>(`${this.API}/cursos`)
      .subscribe({

        next: (res) => {

          this.cursos = res || [];
        },

        error: (err) => {

          console.error(err);
        }
      });
  }

  crearCurso(): void {

    const body = {

      titulo: this.titulo,
      descripcion: this.descripcion,
      categoria: this.categoria,
      nivel: this.nivel,
      emoji: this.emoji,
      precio: this.precio,
      rating: this.rating
    };

    this.http.post(`${this.API}/cursos`, body)
      .subscribe({

        next: () => {

          alert('✅ Curso creado correctamente');

          this.titulo = '';
          this.descripcion = '';
          this.categoria = '';
          this.nivel = 'Platino';
          this.emoji = '';
          this.precio = 0;
          this.rating = 5;

          this.obtenerCursos();
        },

        error: (err) => {

          console.error(err);

          alert('❌ Error al crear curso');
        }
      });
  }

  eliminarCurso(id: number): void {

    const confirmar = confirm(
      '¿Seguro que deseas eliminar este curso?'
    );

    if (!confirmar) return;

    this.http.delete(`${this.API}/cursos/${id}`)
      .subscribe({

        next: () => {

          this.obtenerCursos();
        },

        error: (err) => {

          console.error(err);
        }
      });
  }
}

