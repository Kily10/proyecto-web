import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pago.html',
  styleUrls: ['./pago.css']
})
export class PagoComponent implements OnInit {

  user: any = {};

  curso: any = {
    emoji: '📚',
    titulo: '',
    nivel: '',
    rating: '',
    precio: 0,
    precioOriginal: 0,
    descuento: 0
  };

  nombre = '';
  tarjeta = '';
  fecha = '';
  cvv = '';

  pais = 'bo';

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    const state = history.state;

    if (state?.curso) {
      this.curso = state.curso;
      return;
    }

    const cursoGuardado = localStorage.getItem('curso_pago');

    if (cursoGuardado) {
      this.curso = JSON.parse(cursoGuardado);
      return;
    }

    const plan = this.route.snapshot.paramMap.get('plan');

    if (plan) {
      this.curso = this.crearCursoDesdePlan(plan);
    }
  }

  crearCursoDesdePlan(plan: string) {
    let precio = 0;

    if (plan === 'Platino') precio = 20;
    if (plan === 'Gold') precio = 25;
    if (plan === 'Diamante') precio = 30;

    return {
      emoji: '💎',
      titulo: `Plan ${plan}`,
      nivel: plan,
      rating: '4.9',
      precio: precio,
      precioOriginal: precio,
      descuento: 0
    };
  }

  puedeComprar(curso: any): boolean {
    return !!curso && curso.precio >= 0;
  }

  procesarPago(curso: any): void {

    if (!this.nombre || !this.tarjeta || !this.fecha || !this.cvv) {
      alert('Completa todos los campos de la tarjeta');
      return;
    }

    const datosPago = {
      user_id: this.user.id,
      plan: curso.nivel,
      curso: curso.titulo,
      precio: curso.precio,
      nombre: this.nombre,
      tarjeta: this.tarjeta,
      fecha: this.fecha,
      cvv: this.cvv,
      pais: this.pais
    };

    this.http.post(`${this.API}/pago`, datosPago).subscribe({

      next: (res: any) => {
        console.log(res);

        this.user.plan = curso.nivel;

        localStorage.setItem('user', JSON.stringify(this.user));

        alert('💳 Pago realizado correctamente');

        this.router.navigate(['/cursos']);
      },

      error: (err) => {
        console.log(err);
        alert('Error en el pago ❌');
      }

    });
  }
}