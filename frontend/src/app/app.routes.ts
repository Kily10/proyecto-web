import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { CursosComponent } from './pages/cursos/cursos';
import { HistorialComponent } from './pages/historial/historial';
import { CursoComponent } from './pages/curso/curso';
import { authGuard } from './auth.guard';
import { PlanesComponent } from './pages/planes/planes';

export const routes = [

  { path: '', component: LoginComponent },
  { path: 'planes', component: PlanesComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'cursos', component: CursosComponent, canActivate: [authGuard] },
  { path: 'curso/:id', component: CursoComponent, canActivate: [authGuard] },
  { path: 'historial', component: HistorialComponent, canActivate: [authGuard] }

];