import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html'
})
export class HistorialComponent implements OnInit {

  historial: any[] = [];
  user: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.auth.getHistorial(this.user.id).subscribe((res: any) => {
      this.historial = res;
    });
  }
}