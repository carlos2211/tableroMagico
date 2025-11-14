import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { LoginComponent } from './pages/login/login';
import { RegistroComponent } from './pages/registro/registro';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categorias/:slug', component: CategoriasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }
];
