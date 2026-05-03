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


@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
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
    CartService
  ) {}


  openCart() {

    this.cartService.toggleCart();

  }

}
