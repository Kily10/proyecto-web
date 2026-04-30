import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HistorialComponent } from './pages/historial/historial';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: LoginComponent },   // login
  { path: 'home', component: HomeComponent }, // página principal
  { path: 'historial', component: HistorialComponent } // historial
];