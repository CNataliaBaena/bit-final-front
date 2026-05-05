import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  AuthService
} from '../../../services/auth.service';


@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './login.html',

  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';

  password = '';

  errorMessage = '';

  isRegisterMode = false;


  constructor(

    private authService:
      AuthService,

    private router:
      Router

  ) { }


  /* =========================
      LOGIN
  ========================= */
  login() {

    this.authService
      .login(

        this.email,

        this.password

      )
      .subscribe({

        next: (response) => {

          localStorage.setItem(

            'token',

            response.token

          );


          localStorage.setItem(

            'role',

            response.role

          );


          this.router.navigate([
            '/tienda'
          ]);

        },

        error: () => {

          this.errorMessage =

            'Credenciales incorrectas';

        }

      });

  }


  /* =========================
      REGISTER
  ========================= */
  register() {

    this.authService
      .register(

        this.email,

        this.password

      )
      .subscribe({

        next: () => {

          this.errorMessage =

            'Cuenta creada. Ahora inicia sesión';


          this.isRegisterMode =
            false;


          this.password = '';

        },

        error: () => {

          this.errorMessage =

            'Ese correo ya existe';

        }

      });

  }


  /* =========================
      CAMBIAR MODO
  ========================= */
  toggleMode() {

    this.isRegisterMode =

      !this.isRegisterMode;


    this.errorMessage = '';

  }

}
