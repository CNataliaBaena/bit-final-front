import {
  Component,
  AfterViewInit,
  ChangeDetectorRef
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
export class App implements AfterViewInit {

  darkMode = false;

  fontSize = 16;

  cart: any[] = [];

  cartCount = 0;

  showCart = false;


  constructor(

    private cartService:
      CartService,

    private cdr:
      ChangeDetectorRef

  ) {

    this.cartService
      .cartItems$
      .subscribe(items => {

        this.cart = items;


        this.cartCount =

          items.reduce(

            (
              total,
              item
            ) =>

              total +

              (
                item.quantity || 0
              ),

            0

          );

      });


    const savedDarkMode =

      localStorage.getItem(
        'darkMode'
      );


    if (savedDarkMode) {

      this.darkMode =

        JSON.parse(
          savedDarkMode
        );


      if (this.darkMode) {

        document.body
          .classList
          .add(
            'dark'
          );

      }

    }

  }


  /* SOLUCIONA NG0100 */
  ngAfterViewInit() {

    this.cdr.detectChanges();

  }


  increaseFontSize() {

    this.fontSize =

      Math.min(

        this.fontSize + 2,

        24

      );


    document.documentElement
      .style.fontSize =

      `${this.fontSize}px`;

  }


  resetFontSize() {

    this.fontSize = 16;


    document.documentElement
      .style.fontSize =

      '16px';

  }


  toggleDarkMode() {

    this.darkMode =

      !this.darkMode;


    localStorage.setItem(

      'darkMode',

      JSON.stringify(
        this.darkMode
      )

    );


    if (this.darkMode) {

      document.body
        .classList
        .add(
          'dark'
        );

    } else {

      document.body
        .classList
        .remove(
          'dark'
        );

    }

  }


  openCart() {

    this.showCart =

      !this.showCart;

  }

}
