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
  modoRegistro: boolean = false; // 🔥 cambiar entre login / registro

  constructor(private router: Router) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  // 🔥 LOGIN
  login() {

    if (!this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existe = users.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    if (!existe) {
      alert('Cuenta no encontrada ❌');
      return;
    }

    localStorage.setItem('user', JSON.stringify(existe));
    this.router.navigate(['/home']);
  }

  // 🔥 REGISTRO
  register() {

    if (!this.email || !this.password) {
      alert('Completa los campos');
      return;
    }

    if (!this.email.includes('@gmail.com')) {
      alert('Debe ser Gmail');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existe = users.find((u: any) => u.email === this.email);

    if (existe) {
      alert('Esta cuenta ya existe ⚠️');
      return;
    }

    const newUser = {
      id: Date.now(),
      email: this.email,
      password: this.password,
      plan: 'Gratis',
      role: this.email === 'admin@gmail.com' ? 'admin' : 'user',
      loginTime: new Date().toLocaleString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Cuenta creada ✅');

    this.modoRegistro = false;
  }

  // 🔄 cambiar modo
  toggleModo() {
    this.modoRegistro = !this.modoRegistro;
  }

}