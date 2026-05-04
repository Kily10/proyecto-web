import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router) {}

  login() {

    // 🔴 VALIDACIÓN BÁSICA
    if (!this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    // 🔥 USUARIO SIMULADO
    if (this.email === 'admin@test.com' && this.password === '1234') {

      const user = {
        id: 1,
        email: this.email
      };

      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigate(['/home']);

    } else {
      alert('Credenciales incorrectas');
    }

  }

}