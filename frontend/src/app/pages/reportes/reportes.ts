import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

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
  usuarios: any = {
    activos: 0,
    inactivos: 0
  };

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.loadReportes();
  }

  loadReportes() {

    // 💰 INGRESOS
    this.http.get<any>(`${this.API}/reporte/ingresos`)
      .subscribe(res => {

        this.ingresos = res || [];

        this.cd.detectChanges();

        this.graficoIngresos();
      });

    // 🔥 CURSOS
    this.http.get<any>(`${this.API}/reporte/cursos`)
      .subscribe(res => {

        this.cursos = res || [];

        this.cd.detectChanges();

        this.graficoCursos();
      });

    // 👥 USUARIOS
    this.http.get<any>(`${this.API}/reporte/usuarios`)
      .subscribe(res => {

        this.usuarios = res || {
          activos: 0,
          inactivos: 0
        };

        this.cd.detectChanges();

        this.graficoUsuarios();
      });
  }

  // 💰 GRÁFICO INGRESOS
  graficoIngresos() {

    new Chart('chartIngresos', {

      type: 'bar',

      data: {

        labels: this.ingresos.map(i => i.plan),

        datasets: [{
          label: 'Ingresos',
          data: this.ingresos.map(i => i.ingresos)
        }]
      }
    });
  }

  // 🔥 GRÁFICO CURSOS
  graficoCursos() {

    new Chart('chartCursos', {

      type: 'pie',

      data: {

        labels: this.cursos.map(c => c.accion),

        datasets: [{
          label: 'Cursos',
          data: this.cursos.map(c => c.total)
        }]
      }
    });
  }

  // 👥 GRÁFICO USUARIOS
  graficoUsuarios() {

    new Chart('chartUsuarios', {

      type: 'doughnut',

      data: {

        labels: ['Activos', 'Inactivos'],

        datasets: [{
          label: 'Usuarios',
          data: [
            this.usuarios.activos,
            this.usuarios.inactivos
          ]
        }]
      }
    });
  }
}