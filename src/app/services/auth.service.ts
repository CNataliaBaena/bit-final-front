import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://54.174.233.161:4000/usuarios';


  constructor(

    private http:
      HttpClient

  ) { }


  /* =========================
      LOGIN
  ========================= */
  login(

    email: string,

    password: string

  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/login`,

      {

        email,

        password

      }

    );

  }


  /* =========================
      REGISTER CLIENTE
  ========================= */
  register(

    email: string,

    password: string

  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/register`,

      {

        email,

        password

      }

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

  }


  /* =========================
      VALIDACIONES
  ========================= */
  isLoggedIn() {

    return !!localStorage.getItem(
      'token'
    );

  }


  isAdmin() {

    return localStorage.getItem(
      'role'
    ) === 'admin';

  }

}
