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

    // 💰 INGRESOS
    this.http.get(`${this.API}/reporte/ingresos`)
      .subscribe({
        next: (data: any) => {
          console.log('💰 INGRESOS:', data);
          this.ingresos = data || [];
        },
        error: (err) => console.error('❌ Error ingresos:', err)
      });

    // 🔥 CURSOS
    this.http.get(`${this.API}/reporte/cursos`)
      .subscribe({
        next: (data: any) => {
          console.log('🔥 CURSOS:', data);
          this.cursos = data || [];
        },
        error: (err) => console.error('❌ Error cursos:', err)
      });

    // 👥 USUARIOS
    this.http.get(`${this.API}/reporte/usuarios`)
      .subscribe({
        next: (data: any) => {
          console.log('👥 USUARIOS:', data);
          this.usuarios = data || { activos: 0, inactivos: 0 };
        },
        error: (err) => console.error('❌ Error usuarios:', err)
      });
  }
}