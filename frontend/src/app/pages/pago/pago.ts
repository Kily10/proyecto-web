
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html',
  styleUrls: ['./pago.css']
})
export class PagoComponent implements OnInit {

  plan = '';
  precio = 0;

  nombre = '';
  tarjeta = '';
  fecha = '';
  cvv = '';

  user: any;

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    this.plan =
      this.route.snapshot.paramMap.get('plan') || '';

    // PRECIOS
    if (this.plan === 'Platino') {
      this.precio = 20;
    }

    if (this.plan === 'Gold') {
      this.precio = 25;
    }

    if (this.plan === 'Diamante') {
      this.precio = 30;
    }
  }

  pagar(): void {

    // VALIDACIONES
    if (
      !this.nombre ||
      !this.tarjeta ||
      !this.fecha ||
      !this.cvv
    ) {

      alert('Completa todos los campos');

      return;
    }

    // ÚLTIMOS 4
    const ultimos4 =
      this.tarjeta.slice(-4);

    this.http.post(`${this.API}/pago`, {

      user_id: this.user.id,
      plan: this.plan,
      monto: this.precio,
      metodo: 'Tarjeta',
      ultimos4: ultimos4

    }).subscribe({

      next: (res: any) => {

        // actualizar user
        this.user.plan = this.plan;

        localStorage.setItem(
          'user',
          JSON.stringify(this.user)
        );

        alert(
          '💳 Pago realizado correctamente'
        );

        this.router.navigate(['/cursos']);
      },

      error: (err) => {

        console.log(err);

        alert('Error en el pago ❌');
      }
    });
  }
}

