import {
  Routes
} from '@angular/router';

import {
  TiendaComponent
} from './components/pages/tienda/tienda';

import {
  RecetasComponent
} from './components/pages/recetas/recetas';

import {
  LoginComponent
} from './components/pages/login/login';

import {
  authGuard
} from './guards/auth.guard';


export const routes: Routes = [

  {
    path: '',

    redirectTo: 'tienda',

    pathMatch: 'full'
  },


  {
    path: 'tienda',

    component:
      TiendaComponent,

    canActivate: [
      authGuard
    ]
  },


  {
    path: 'recetas',

    component:
      RecetasComponent
  },


  {
    path: 'login',

    component:
      LoginComponent
  }

];
