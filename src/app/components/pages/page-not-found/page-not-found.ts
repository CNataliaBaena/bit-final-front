import {
  Component,
  DoCheck
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './page-not-found.html',

  styleUrls: ['./page-not-found.css']
})
export class PageNotFoundComponent implements DoCheck {

  darkMode = false;

  ngDoCheck(): void {

    this.darkMode =
      document.body
        .classList
        .contains('dark');

  }

}
