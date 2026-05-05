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
export class TiendaService {

  private apiUrl =
    'http://localhost:4000/productos';


  constructor(
    private http:
      HttpClient
  ) { }


  /* =========================
      GET
  ========================= */

  getProducts():
    Observable<any> {

    return this.http.get(
      this.apiUrl
    );

  }


  /* =========================
      POST
  ========================= */

  createProduct(
    product: any
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      product
    );

  }


  /* =========================
      PUT
  ========================= */

  updateProduct(
    id: string,
    product: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      product
    );

  }


  /* =========================
      DELETE
  ========================= */

  deleteProduct(
    id: string
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}
