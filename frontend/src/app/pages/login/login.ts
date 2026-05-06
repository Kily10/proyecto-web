import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  modoRegistro: boolean = false;

  private API = 'http://127.0.0.1:8000/api';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const stored = localStorage.getItem('user');

    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user && user.id) {
          this.router.navigate(['/home']);
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }

  // 🔥 LOGIN CORREGIDO Y BLINDADO
  login() {

    if (!this.email || !this.password) {
      alert('Completa los campos');
      return;
    }

    this.http.post(`${this.API}/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {

        console.log('🔐 RESPUESTA LOGIN:', res);

        // 🔥 soporta ambos formatos: {user: {...}} o directo {...}
        const user = res.user ? res.user : res;

        if (!user || !user.id) {
          alert('Error: usuario inválido ❌');
          return;
        }

        // 🔥 guardar limpio
        localStorage.setItem('user', JSON.stringify(user));

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('❌ ERROR LOGIN:', err);
        alert('Credenciales incorrectas ❌');
      }
    });
  }

  // 🔥 REGISTRO
  register() {

    if (!this.email || !this.password) {
      alert('Completa los campos');
      return;
    }

    this.http.post(`${this.API}/register`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Cuenta creada en BD ✅');
        this.modoRegistro = false;
      },
      error: (err) => {
        console.error('❌ ERROR REGISTER:', err);
        alert('Error al registrar ❌');
      }
    });
  }

  toggleModo() {
    this.modoRegistro = !this.modoRegistro;
  }

}