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
    'http://54.174.233.161:4000/pedidos';


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


  getOrders(): Observable<any> {

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }


  createOrder(
    pedido: any
  ): Observable<any> {

    return this.http.post(

      this.apiUrl,

      pedido,

      this.getHeaders()

    );

  }


  updateOrderStatus(

    id: string,

    estado: string

  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/${id}`,

      { estado },

      this.getHeaders()

    );

  }


  deleteOrder(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

}
