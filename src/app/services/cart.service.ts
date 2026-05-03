import { Injectable } from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  /* Abrir/Cerrar */
  private cartVisibleSource =
    new BehaviorSubject<boolean>(
      false
    );

  cartVisible$ =
    this.cartVisibleSource
      .asObservable();


  /* Cantidad */
  private cartCountSource =
    new BehaviorSubject<number>(
      0
    );

  cartCount$ =
    this.cartCountSource
      .asObservable();


  toggleCart() {

    this.cartVisibleSource.next(
      !this.cartVisibleSource.value
    );

  }


  updateCartCount(
    count: number
  ) {

    this.cartCountSource.next(
      count
    );

  }

}
