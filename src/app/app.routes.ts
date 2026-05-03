import { Routes } from '@angular/router';
import { TiendaComponent } from './components/pages/tienda/tienda';
import { RecetasComponent } from './components/pages/recetas/recetas';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'tienda',
    pathMatch: 'full'
  },

  {
    path: 'tienda',
    component: TiendaComponent
  },

  {
    path: 'recetas',
    component: RecetasComponent
  }

];
