import {
  Component
} from '@angular/core';

import {
  RouterOutlet
} from '@angular/router';

import {
  CommonModule
} from '@angular/common';

import {
  HeaderComponent
} from './components/shared/header/header';

import {
  CartService
} from './services/cart.service';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent
  ],

  templateUrl: './app.html',

  styleUrl: './app.css'
})
export class App {

  darkMode = false;

  fontSize = 16;

  cart: any[] = [];

  showCart = false;


  constructor(
    private cartService:
      CartService
  ) {

    /* ESCUCHAR CAMBIOS DEL CARRITO */
    this.cartService
      .cartCount$
      .subscribe(
        (count: number) => {

          this.cart =
            new Array(count);

        }
      );

  }


  /* =========================
    FUENTE GLOBAL
  ========================= */

  increaseFontSize() {

    this.fontSize =
      Math.min(
        this.fontSize + 2,
        24
      );

    document.documentElement.style.fontSize =
      `${this.fontSize}px`;

  }


  resetFontSize() {

    this.fontSize = 16;

    document.documentElement.style.fontSize =
      '16px';

  }


  /* =========================
    DARK MODE
  ========================= */

  toggleDarkMode() {

    this.darkMode =
      !this.darkMode;

    if (this.darkMode) {

      document.body.classList.add(
        'dark'
      );

    } else {

      document.body.classList.remove(
        'dark'
      );

    }

  }


  /* =========================
    CARRITO
  ========================= */

  openCart() {

    this.showCart =
      !this.showCart;

  }

}
