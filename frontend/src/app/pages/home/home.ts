import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  // 🔥 cerrar sesión
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}