import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  /* =========================
      VISIBILIDAD DEL CARRITO
  ========================= */
  private cartVisibleSource =

    new BehaviorSubject<boolean>(
      false
    );


  cartVisible$ =

    this.cartVisibleSource
      .asObservable();


  /* =========================
      CARGAR LOCAL STORAGE
  ========================= */
  private initialCart =

    JSON.parse(

      localStorage.getItem(
        'cart'
      ) || '[]'

    );


  /* =========================
      PRODUCTOS DEL CARRITO
  ========================= */
  private cartItemsSource =

    new BehaviorSubject<any[]>(

      this.initialCart

    );


  cartItems$ =

    this.cartItemsSource
      .asObservable();


  /* =========================
      GUARDAR CARRITO
  ========================= */
  private saveCart() {

    localStorage.setItem(

      'cart',

      JSON.stringify(

        this.cartItemsSource
          .value

      )

    );

  }


  /* =========================
      ABRIR / CERRAR
  ========================= */
  toggleCart() {

    this.cartVisibleSource.next(

      !this.cartVisibleSource
        .value

    );

  }


  closeCart() {

    this.cartVisibleSource.next(
      false
    );

  }


  /* =========================
      AGREGAR PRODUCTO
  ========================= */
  addToCart(
    product: any
  ) {

    const currentCart =

      [
        ...this.cartItemsSource
          .value
      ];


    const existingItem =

      currentCart.find(

        item =>

          item._id ===

          product._id

      );


    if (existingItem) {

      existingItem.quantity += 1;

    } else {

      currentCart.push({

        ...product,

        quantity: 1

      });

    }


    this.cartItemsSource.next(
      currentCart
    );


    this.saveCart();

  }


  /* =========================
      ELIMINAR PRODUCTO
  ========================= */
  removeFromCart(
    productId: string
  ) {

    const updatedCart =

      this.cartItemsSource
        .value
        .filter(

          item =>

            item._id !==

            productId

        );


    this.cartItemsSource.next(
      updatedCart
    );


    this.saveCart();

  }


  /* =========================
      VACIAR
  ========================= */
  clearCart() {

    this.cartItemsSource.next(
      []
    );


    this.saveCart();

  }


  /* =========================
      CANTIDAD
  ========================= */
  getCartCount() {

    return this.cartItemsSource
      .value
      .reduce(

        (
          total,
          item
        ) =>

          total +

          item.quantity,

        0

      );

  }

}
