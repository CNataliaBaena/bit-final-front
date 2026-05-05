import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  NavigationComponent
} from '../navigation/navigation';

import {
  CartService
} from '../../../services/cart.service';

import {
  AuthService
} from '../../../services/auth.service';

import {
  CommonModule
} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
    CommonModule,
    NavigationComponent
  ],

  templateUrl: './header.html',

  styleUrls: ['./header.css']
})
export class HeaderComponent {

  @Input() darkMode = false;

  @Input() cartCount = 0;


  @Output() fontIncrease =
    new EventEmitter<void>();

  @Output() darkModeToggle =
    new EventEmitter<void>();


  constructor(

    private cartService:
      CartService,

    private authService:
      AuthService

  ) { }


  openCart() {

    this.cartService.toggleCart();

  }


  logout() {

    this.authService.logout();

    window.location.reload();

  }


  isAdmin() {

    return this.authService
      .isAdmin();

  }

}
