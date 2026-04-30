import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { CursosComponent } from './pages/cursos/cursos';
import { HistorialComponent } from './pages/historial/historial';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'historial', component: HistorialComponent }
];