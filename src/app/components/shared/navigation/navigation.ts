import {
  Component,
  DoCheck
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule,
  Router
} from '@angular/router';


@Component({
  selector: 'app-navigation',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './navigation.html',

  styleUrls: ['./navigation.css']
})
export class NavigationComponent
  implements DoCheck {

  loggedIn = false;


  constructor(

    private router:
      Router

  ) { }


  /* =========================
      REVISAR SESIÓN
  ========================= */
  ngDoCheck() {

    this.loggedIn =

      !!localStorage.getItem(
        'token'
      );

  }


  /* =========================
      LOGOUT
  ========================= */
  logout() {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'role'
    );

    this.router.navigate([
      '/login'
    ]);

  }

}
