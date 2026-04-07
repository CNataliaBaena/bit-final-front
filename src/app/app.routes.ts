import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Products } from './components/pages/products/products';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';

export const routes: Routes = [
  {path: "inicio", component: Home, title: "Inicio"},
  {path: "productos", component: Products, title: "Productos"},
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "**", component: PageNotFound, title: "Error 404"}
];
