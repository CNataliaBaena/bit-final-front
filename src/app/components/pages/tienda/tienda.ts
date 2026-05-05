import {
  Component,
  OnInit,
  DoCheck,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
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

import {
  PedidoService
} from '../../../services/pedido.service';


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
  implements OnInit, DoCheck, OnDestroy {

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

  isAdmin = false;

  orders: any[] = [];

  selectedOrderStatus =
    'todos';

  totalSales = 0;

  totalOrders = 0;

  totalProductsSold = 0;

  editingId: string | null = null;

  totalCart = 0;

  ordersInterval: any;

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
      ChangeDetectorRef,

    private pedidoService:
      PedidoService,

    private ngZone:
      NgZone

  ) { }


  /* =========================
      DARK MODE
  ========================= */

  ngDoCheck() {

    this.darkMode =
      document.body
        .classList
        .contains(
          'dark'
        );

    this.totalCart =

      this.cart.reduce(

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

      );

  }


  /* =========================
      INIT
  ========================= */

  ngOnInit(): void {

    this.showCart = false;

    this.isAdmin =

      localStorage.getItem(
        'role'
      ) === 'admin';

    this.cartService.closeCart();

    this.loadProducts();


    /* PEDIDOS */
    this.loadOrders();

    this.ordersInterval =

      setInterval(

        () => {

          this.loadOrders();

        },

        5000

      );

    /* ITEMS DEL CARRITO */
    this.cartService
      .cartItems$
      .subscribe(items => {

        this.cart = items;

      });


    /* ABRIR / CERRAR CARRITO */
    this.cartService
      .cartVisible$
      .subscribe(value => {

        this.showCart = value;

      });

  }


  /* =========================
      CARRUSEL
  ========================= */

  updateVisibleProducts() {

    if (

      !this.products ||

      this.products.length === 0

    ) {

      this.visibleProducts = [];

      return;

    }


    const cardsToShow =

      Math.min(

        4,

        this.products.length

      );


    this.visibleProducts = [];


    for (

      let i = 0;

      i < cardsToShow;

      i++

    ) {

      const index =

        (
          this.currentSlide + i
        )

        %

        this.products.length;


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

      %

      this.products.length;


    this.updateVisibleProducts();

  }


  prevSlide() {

    this.currentSlide =

      (
        this.currentSlide - 1 +

        this.products.length
      )

      %

      this.products.length;


    this.updateVisibleProducts();

  }


  startCarousel() {

    setInterval(() => {

      if (

        this.products.length > 0

      ) {

        this.nextSlide();

        this.cdr.detectChanges();

      }

    }, 4000);

  }


  /* =========================
      PEDIDOS
  ========================= */

  loadOrders() {

    this.pedidoService
      .getOrders()
      .subscribe({

        next: (data) => {

          this.orders =
            data || [];


          /* MÉTRICAS */
          this.totalOrders =

            this.orders.length;


          this.totalSales =

            this.orders.reduce(

              (
                total,
                order
              ) =>

                total +

                (
                  order.total || 0
                ),

              0

            );


          this.totalProductsSold =

            this.orders.reduce(

              (
                total,
                order
              ) =>

                total +

                order.productos.reduce(

                  (
                    subtotal: number,

                    product: any

                  ) =>

                    subtotal +

                    (
                      product.quantity || 0
                    ),

                  0

                ),

              0

            );

        },

        error: (error: any) => {

          console.error(
            error
          );

        }

      });

  }


  changeOrderStatus(

    orderId: string,

    estado: string

  ) {

    this.pedidoService
      .updateOrderStatus(

        orderId,

        estado

      )
      .subscribe({

        next: () => {

          this.loadOrders();

          this.showToastMessage(
            '📦 Estado actualizado'
          );

        },

        error: (error) => {

          console.error(
            error
          );

        }

      });

  }


  /* =========================
      CARRITO
  ========================= */

  addToCart(
    product: any
  ) {

    this.cartService
      .addToCart(
        product
      );

    this.showToastMessage(
      '🛒 Producto agregado'
    );

  }


  removeFromCart(
    productId: string
  ) {

    this.cartService
      .removeFromCart(
        productId
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


  finalizarCompra() {

    if (!this.cart.length) {

      this.showToastMessage(
        '⚠ El carrito está vacío'
      );

      return;

    }


    const pedido = {

      productos:
        this.cart,

      total:
        this.getCartValue()

    };


    this.pedidoService
      .createOrder(
        pedido
      )
      .subscribe({

        next: () => {

          this.showToastMessage(
            '✅ Pedido realizado'
          );


          this.ngZone.runOutsideAngular(
            () => {

              setTimeout(() => {

                this.ngZone.run(
                  () => {

                    this.cartService
                      .clearCart();

                    this.showCart =
                      false;


                    if (this.isAdmin) {

                      this.loadOrders();

                    }

                  }
                );

              }, 0);

            }
          );

        },

        error: (error: any) => {

          console.error(
            error
          );

        }

      });



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
      .subscribe({

        next: (data) => {

          this.products = data || [];

          this.updateVisibleProducts();

          this.startCarousel();

          this.cdr
            .detectChanges();

        },

        error: (error) => {

          console.error(
            error
          );

        }

      });

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

          }

        });

    }

  }


  deleteProduct(
    id: string
  ) {

    this.tiendaService
      .deleteProduct(id)
      .subscribe({

        next: () => {

          this.loadProducts();

        }

      });

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


  resetForm() {

    this.editingId =
      null;


    this.newProduct = {

      name: '',

      category:
        'Cupcakes',

      description: '',

      price: null,

      ingredients: '',

      instructions: '',

      image: ''

    };

  }


  /* =========================
      FILTROS
  ========================= */

  getFilteredProducts() {

    let filtered =
      this.products;


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


  /* =========================
      DASHBOARD
  ========================= */

  getProductsCount() {

    return this.products.length;

  }


  getCartCount() {

    return this.cart.reduce(

      (total, item) =>

        total +
        (
          item.quantity || 0
        ),

      0

    );

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


  /* =========================
      TOAST
  ========================= */

  showToastMessage(
    message: string
  ) {

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

  ngOnDestroy(): void {

    clearInterval(

      this.ordersInterval

    );

  }

  getFilteredOrders() {

    if (

      this.selectedOrderStatus ===
      'todos'

    ) {

      return this.orders;

    }


    return this.orders.filter(

      order =>

        order.estado ===

        this.selectedOrderStatus

    );

  }

}
