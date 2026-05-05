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
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  // 🔥 LOGIN REAL
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
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Credenciales incorrectas ❌');
      }
    });
  }

  // 🔥 REGISTRO REAL
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
      error: () => {
        alert('Error al registrar ❌');
      }
    });
  }

  // 🔄 CAMBIAR MODO
  toggleModo() {
    this.modoRegistro = !this.modoRegistro;
  }

}