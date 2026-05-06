import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class HistorialComponent implements OnInit {

  historial: any[] = [];
  user: any = null;

  private API = 'http://127.0.0.1:8000/api';

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUserAndData();
  }

  loadUserAndData() {

    const stored = localStorage.getItem('user');

    if (!stored) return;

    this.user = JSON.parse(stored);

    if (!this.user?.id) return;

    this.http.get<any[]>(`${this.API}/historial/${this.user.id}`)
      .subscribe(res => {
        this.historial = res || [];
        this.cd.detectChanges(); // 🔥 CLAVE
      });
  }
}