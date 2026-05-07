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
  nivel = '';

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.http.get<any[]>(`${this.API}/cursos`)
      .subscribe(res => {
        this.cursos = res;
      });
  }

  crearCurso() {

    const body = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      categoria: this.categoria,
      nivel: this.nivel
    };

    this.http.post(`${this.API}/cursos`, body)
      .subscribe({
        next: () => {

          alert('Curso creado ✅');

          this.titulo = '';
          this.descripcion = '';
          this.categoria = '';
          this.nivel = '';

          this.obtenerCursos();
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear curso ❌');
        }
      });
  }

  eliminarCurso(id: number) {

    this.http.delete(`${this.API}/cursos/${id}`)
      .subscribe(() => {
        this.obtenerCursos();
      });
  }
}