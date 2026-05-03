import {
  Component,
  OnInit,
  DoCheck,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  CartService
} from '../../../services/cart.service';

import {
  TiendaService
} from '../../../services/tienda';

import {
  FooterComponent
} from '../../shared/footer/footer';

@Component({
  selector: 'app-tienda',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    FooterComponent
  ],

  templateUrl: './tienda.html',

  styleUrls: ['./tienda.css']
})

export class TiendaComponent
  implements OnInit, DoCheck {

  products: any[] = [];

  visibleProducts: any[] = [];

  cart: any[] = [];

  darkMode = false;

  showCart = false;

  selectedRecipe: any = null;

  currentSlide = 0;

  searchText = '';

  selectedCategory =
    'Todos';

  toastMessage = '';

  showToast = false;

  editingId: string | null =
    null;

  newProduct = {

    name: '',

    category: 'Cupcakes',

    description: '',

    price: null,

    ingredients: '',

    instructions: '',

    image: ''

  };

  constructor(

  private tiendaService:
    TiendaService,

  private cartService:
    CartService,

  private cdr:
    ChangeDetectorRef

) {}


  /* =========================
     SYNC DARK MODE
  ========================= */

  ngDoCheck() {

    this.darkMode =
      document.body.classList.contains(
        'dark'
      );

  }


  ngOnInit(): void {

    /* CARGAR PRODUCTOS */
    this.loadProducts();


    /* ESCUCHAR HEADER */
    this.cartService
      .cartVisible$
      .subscribe(
        (value: boolean) => {

          this.showCart =
            value;

        }
      );

  }


  /* =========================
     CARRUSEL
  ========================= */

  updateVisibleProducts() {

    this.visibleProducts = [];

    const cardsToShow =
      Math.min(
        4,
        this.products.length
      );

    for (
      let i = 0;
      i < cardsToShow;
      i++
    ) {

      const index =
        (
          this.currentSlide + i
        )
        % this.products.length;

      this.visibleProducts.push(
        this.products[index]
      );

    }

  }


  nextSlide() {

    this.currentSlide =
      (
        this.currentSlide + 1
      )
      % this.products.length;

    this.updateVisibleProducts();

  }


  prevSlide() {

    this.currentSlide =
      (
        this.currentSlide - 1
        + this.products.length
      )
      % this.products.length;

    this.updateVisibleProducts();

  }


  /* =========================
     CARRITO
  ========================= */

  addToCart(
  product: any
) {

  const existingItem =
    this.cart.find(
      item =>

        item._id ===
        product._id

    );


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    this.cart.push({

      ...product,

      quantity: 1

    });

  }


  this.cartService
    .updateCartCount(

      this.cart.length

    );

}


  removeFromCart(
  productId: string
) {

  this.cart =
    this.cart.filter(
      item =>

        item._id !==
        productId

    );


  this.cartService
    .updateCartCount(
      this.cart.length
    );

}


  getTotalPrice() {

    return this.cart
      .reduce(
        (
          total,
          item
        ) =>
          total +
          (
            item.price *
            item.quantity
          ),
        0
      )
      .toFixed(2);

  }


  /* =========================
     RECETAS
  ========================= */

  openRecipe(
    product: any
  ) {

    this.selectedRecipe =
      product;

  }


  closeRecipe() {

    this.selectedRecipe =
      null;

  }

  /* =========================
     CRUD PRODUCTOS
  ========================= */

  loadProducts() {

  this.tiendaService
    .getProducts()
    .subscribe(
      (data) => {

        this.products =
          data;

        this.updateVisibleProducts();


        /* FORZAR REFRESH UI */
        this.cdr.detectChanges();

      }
    );

}


  saveProduct() {

    if (
      !this.newProduct.name ||
      !this.newProduct.description ||
      !this.newProduct.price ||
      !this.newProduct.image
    ) {

      this.showToastMessage(
        '⚠ Completa los campos'
      );

      return;

    }


    if (this.editingId) {

      this.tiendaService
        .updateProduct(
          this.editingId,
          this.newProduct
        )
        .subscribe({

          next: () => {

            this.resetForm();

            this.loadProducts();

            this.showToastMessage(
              '✏ Producto actualizado'
            );

          },

          error: (error) => {

            console.error(
              error
            );

          }

        });

    } else {

      this.tiendaService
        .createProduct(
          this.newProduct
        )
        .subscribe({

          next: () => {

            this.resetForm();

            this.loadProducts();

            this.showToastMessage(
              '✅ Producto creado'
            );

          },

          error: (error) => {

            console.error(
              error
            );

          }

        });

    }

  }


  deleteProduct(
    id: string
  ) {

    if (
      !confirm(
        '¿Eliminar este producto?'
      )
    ) {
      return;
    }


    this.tiendaService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          this.loadProducts();

          this.showToastMessage(
            '🗑 Producto eliminado'
          );

        },

        error: (error) => {

          console.error(
            error
          );

        }

      });

  }


  resetForm() {

    this.editingId = null;

    this.newProduct = {

      name: '',

      category: 'Cupcakes',

      description: '',

      price: null,

      ingredients: '',

      instructions: '',

      image: ''

    };

  }

  editProduct(
    product: any
  ) {

    this.editingId =
      product._id;

    this.newProduct = {

      name:
        product.name,

      category:
        product.category,

      description:
        product.description,

      price:
        product.price,

      ingredients:
        product.ingredients,

      instructions:
        product.instructions,

      image:
        product.image

    };

  }

  getFilteredProducts() {

    let filtered =
      this.products;


    /* BUSCADOR */
    if (this.searchText) {

      filtered =
        filtered.filter(
          product =>

            product.name
              .toLowerCase()
              .includes(
                this.searchText
                  .toLowerCase()
              )

        );

    }


    /* CATEGORÍAS */
    if (
      this.selectedCategory
      !== 'Todos'
    ) {

      filtered =
        filtered.filter(
          product =>

            product.category ===
            this.selectedCategory

        );

    }


    return filtered;

  }

  getProductsCount() {

    return this.products.length;

  }


  getCartCount() {

    return this.cart.length;

  }


  getCartValue() {

    return this.cart.reduce(

      (total, item) =>

        total +
        (
          item.price *
          item.quantity
        ),

      0

    );

  }

  showToastMessage(
    message: string
  ) {

    /* Reiniciar estado */
    this.showToast =
      false;

    this.toastMessage =
      '';


    setTimeout(() => {

      this.toastMessage =
        message;

      this.showToast =
        true;


      setTimeout(() => {

        this.showToast =
          false;

        this.toastMessage =
          '';

      }, 2500);

    }, 100);

  }

}
