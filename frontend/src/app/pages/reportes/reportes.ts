import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class ReportesComponent implements OnInit {

  ingresos: any[] = [];
  cursos: any[] = [];
  usuarios: any = { activos: 0, inactivos: 0 };

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadReportes();
  }

  loadReportes() {

    this.http.get<any>(`${this.API}/reporte/ingresos`)
      .subscribe(res => {
        this.ingresos = res || [];
        this.cd.detectChanges(); // 🔥 CLAVE
      });

    this.http.get<any>(`${this.API}/reporte/cursos`)
      .subscribe(res => {
        this.cursos = res || [];
        this.cd.detectChanges(); // 🔥 CLAVE
      });

    this.http.get<any>(`${this.API}/reporte/usuarios`)
      .subscribe(res => {
        this.usuarios = res || { activos: 0, inactivos: 0 };
        this.cd.detectChanges(); // 🔥 CLAVE
      });
  }
}