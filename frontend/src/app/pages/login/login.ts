import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      console.log(res);

      if (res.status === 'ok') {

        // 🔥 GUARDAR USUARIO
        localStorage.setItem('user', JSON.stringify(res.user));

        alert('Login correcto');

        // 🔥 REDIRECCIÓN AL HISTORIAL
        this.router.navigate(['/home']);

      } else {
        alert('Datos incorrectos');
      }
    });
  }
}