import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // LOGIN
  login(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/login', data);
  }

  // HISTORIAL
  getHistorial(userId: number) {
    return this.http.get(`http://127.0.0.1:8000/api/historial/${userId}`);
  }
}