import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class ReportesComponent {

  ingresos: any[] = [];
  cursos: any[] = [];
  usuarios: any;

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {

    // 🔥 INGRESOS
    this.http.get(`${this.API}/reporte/ingresos`)
      .subscribe((data: any) => this.ingresos = data);

    // 🔥 CURSOS TOP
    this.http.get(`${this.API}/reporte/cursos`)
      .subscribe((data: any) => this.cursos = data);

    // 🔥 USUARIOS
    this.http.get(`${this.API}/reporte/usuarios`)
      .subscribe((data: any) => this.usuarios = data);
  }

}