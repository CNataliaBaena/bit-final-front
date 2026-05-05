import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl =
    'http://localhost:4000/pedidos';


  constructor(

    private http:
      HttpClient

  ) { }


  private getHeaders() {

    const token =

      localStorage.getItem(
        'token'
      );


    return {

      headers:

        new HttpHeaders({

          Authorization:

            `Bearer ${token}`

        })

    };

  }


  /* =========================
      CREAR PEDIDO
  ========================= */
  createOrder(
    pedido: any
  ): Observable<any> {

    return this.http.post(

      this.apiUrl,

      pedido,

      this.getHeaders()

    );

  }


  /* =========================
      OBTENER PEDIDOS
  ========================= */
  getOrders():
    Observable<any> {

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }


  /* =========================
      ACTUALIZAR ESTADO
  ========================= */
  updateOrderStatus(

    orderId: string,

    estado: string

  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${orderId}`,

      {
        estado
      },

      this.getHeaders()

    );

  }

}
