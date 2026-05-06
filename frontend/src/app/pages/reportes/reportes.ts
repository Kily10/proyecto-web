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
  usuarios: any = {
    activos: 0,
    inactivos: 0
  };

  private API = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {

    // 💰 INGRESOS
    this.http.get(`${this.API}/reporte/ingresos`)
      .subscribe({
        next: (res: any) => {
          console.log('💰 INGRESOS:', res);
          this.ingresos = Array.isArray(res) ? res : [];
        },
        error: (err) => {
          console.error('❌ Error ingresos:', err);
          this.ingresos = [];
        }
      });

    // 🔥 CURSOS
    this.http.get(`${this.API}/reporte/cursos`)
      .subscribe({
        next: (res: any) => {
          console.log('🔥 CURSOS:', res);
          this.cursos = Array.isArray(res) ? res : [];
        },
        error: (err) => {
          console.error('❌ Error cursos:', err);
          this.cursos = [];
        }
      });

    // 👥 USUARIOS
    this.http.get(`${this.API}/reporte/usuarios`)
      .subscribe({
        next: (res: any) => {
          console.log('👥 USUARIOS:', res);
          this.usuarios = res || { activos: 0, inactivos: 0 };
        },
        error: (err) => {
          console.error('❌ Error usuarios:', err);
          this.usuarios = { activos: 0, inactivos: 0 };
        }
      });

  }
}