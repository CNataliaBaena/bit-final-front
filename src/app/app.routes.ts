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


export const routes:
  Routes = [

    {
      path: '',

      redirectTo:
        'tienda',

      pathMatch:
        'full'
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
        RecetasComponent,

      canActivate: [
        authGuard
      ]

    },


    {
      path: 'login',

      component:
        LoginComponent

    },

    {
      path: '**',
      loadComponent: () =>
        import('./components/pages/page-not-found/page-not-found')
          .then(m => m.PageNotFoundComponent)
    }

  ];
