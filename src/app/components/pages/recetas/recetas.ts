import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  TiendaService
} from '../../../services/tienda';


@Component({
  selector: 'app-recetas',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './recetas.html',

  styleUrls: ['./recetas.css']
})
export class RecetasComponent
  implements OnInit {

  recipes: any[] = [];

  searchText = '';

  selectedCategory =
    'Todos';


  constructor(

    private tiendaService:
      TiendaService,

    private cdr:
      ChangeDetectorRef

  ) { }


  ngOnInit(): void {

    this.loadRecipes();

  }


  loadRecipes(): void {

    this.tiendaService
      .getProducts()
      .subscribe({

        next: (data: any[]) => {

          this.recipes =
            data || [];

          this.cdr
            .detectChanges();

        },

        error: (error: any) => {

          console.error(
            error
          );

        }

      });

  }


  getFilteredRecipes() {

    let filtered =
      this.recipes;


    /* BUSCADOR */
    if (this.searchText) {

      filtered =
        filtered.filter(

          recipe =>

            recipe.name
              .toLowerCase()
              .includes(

                this.searchText
                  .toLowerCase()

              )

        );

    }


    /* CATEGORIA */
    if (

      this.selectedCategory
      !== 'Todos'

    ) {

      filtered =
        filtered.filter(

          recipe =>

            recipe.category ===

            this.selectedCategory

        );

    }


    return filtered;

  }

}
