import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RecetasService
} from '../../../services/recetas';


@Component({
  selector: 'app-recetas',
  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './recetas.html',

  styleUrls: [
    './recetas.css'
  ]
})
export class RecetasComponent
  implements OnInit {

  recipes: any[] = [];


  private recetasService =
    inject(
      RecetasService
    );


  ngOnInit(): void {

    this.recetasService
      .getRecetas()
      .subscribe(
        (data) => {

          this.recipes =
            data;

          console.log(
            'Recetas desde Mongo:',
            data
          );

        }
      );

  }

}
