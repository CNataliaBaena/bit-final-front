// ========================================
// INTERFACES Y TIPOS
// ========================================

interface Recipe {
    ingredients: string[];
    steps: string[];
}

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    recipe: Recipe;
}

interface CartItem extends Product {
    quantity: number;
}

// ========================================
// DATOS DE PRODUCTOS
// ========================================

const products: Product[] = [
    {
        id: 1,
        name: 'Rainbow Cupcake',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400',
        description: 'Deliciosos cupcakes con frosting de colores',
        recipe: {
            ingredients: [
                '2 tazas de harina',
                '1 taza de azúcar',
                '3 huevos',
                'Colorante alimentario',
                'Crema de mantequilla'
            ],
            steps: [
                'Precalienta el horno a 180°C',
                'Mezcla ingredientes secos',
                'Añade huevos y leche',
                'Divide la masa y añade colorantes',
                'Hornea 20 minutos'
            ]
        }
    },
    {
        id: 2,
        name: 'Chocolate Dream',
        price: 4.00,
        image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400',
        description: 'Cupcake de chocolate intenso con frosting cremoso',
        recipe: {
            ingredients: [
                '2 tazas de harina',
                '3/4 taza de cacao',
                '1.5 tazas de azúcar',
                '3 huevos',
                'Chocolate negro'
            ],
            steps: [
                'Mezcla harina y cacao',
                'Bate huevos con azúcar',
                'Combina todo suavemente',
                'Hornea a 175°C por 22 minutos',
                'Decora con ganache'
            ]
        }
    },
    {
        id: 3,
        name: 'Lemon Meringue',
        price: 3.75,
        image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=400',
        description: 'Cupcakes de limón con merengue italiano',
        recipe: {
            ingredients: [
                '2 tazas de harina',
                '1 taza de azúcar',
                'Ralladura de 2 limones',
                '4 claras de huevo',
                'Jugo de limón'
            ],
            steps: [
                'Mezcla ingredientes base con ralladura',
                'Hornea la masa',
                'Prepara merengue italiano',
                'Decora con soplete',
                'Gratina ligeramente'
            ]
        }
    },
    {
        id: 4,
        name: 'Strawberry Delight',
        price: 3.80,
        image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400',
        description: 'Cupcake de chocolate con fresas frescas',
        recipe: {
            ingredients: [
                'Base de chocolate',
                '200g fresas frescas',
                'Crema batida',
                'Azúcar glass',
                'Esencia de vainilla'
            ],
            steps: [
                'Hornea base de chocolate',
                'Prepara crema batida estabilizada',
                'Corta fresas en mitades',
                'Decora con crema',
                'Corona con fresa fresca'
            ]
        }
    },
    {
        id: 5,
        name: 'Cherry Vanilla',
        price: 3.90,
        image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400',
        description: 'Vainilla clásica con cereza confitada',
        recipe: {
            ingredients: [
                '2 tazas de harina',
                'Esencia de vainilla',
                '3 huevos',
                'Cerezas confitadas',
                'Mantequilla'
            ],
            steps: [
                'Mezcla ingredientes base',
                'Añade esencia de vainilla premium',
                'Hornea uniformemente',
                'Prepara buttercream de vainilla',
                'Decora con cereza'
            ]
        }
    }
];

// ========================================
// ESTADO DE LA APLICACIÓN
// ========================================

let cart: CartItem[] = [];
let currentSlide: number = 0;
let fontSize: number = 16;
let darkMode: boolean = false;

// ========================================
// ELEMENTOS DEL DOM
// ========================================

// Función helper para obtener elementos del DOM de forma segura
function getElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id) as T | null;
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}

// Botones de control
const increaseFontBtn = getElement<HTMLButtonElement>('increaseFontBtn');
const darkModeBtn = getElement<HTMLButtonElement>('darkModeBtn');
const cartBtn = getElement<HTMLButtonElement>('cartBtn');
const resetFontBtn = getElement<HTMLButtonElement>('resetFontBtn');

// Iconos de modo oscuro
const moonIcon = getElement<SVGElement>('moonIcon');
const sunIcon = getElement<SVGElement>('sunIcon');

// Carrito
const cartCount = getElement<HTMLSpanElement>('cartCount');
const cartModal = getElement<HTMLDivElement>('cartModal');
const closeCartBtn = getElement<HTMLButtonElement>('closeCartBtn');
const cartItems = getElement<HTMLDivElement>('cartItems');
const cartEmpty = getElement<HTMLDivElement>('cartEmpty');
const cartFooter = getElement<HTMLDivElement>('cartFooter');
const cartTotal = getElement<HTMLSpanElement>('cartTotal');

// Carousel
const carouselTrack = getElement<HTMLDivElement>('carouselTrack');
const carouselIndicators = getElement<HTMLDivElement>('carouselIndicators');
const prevBtn = getElement<HTMLButtonElement>('prevBtn');
const nextBtn = getElement<HTMLButtonElement>('nextBtn');

// Grid de productos
const productsGrid = getElement<HTMLDivElement>('productsGrid');

// Modal de receta
const recipeModal = getElement<HTMLDivElement>('recipeModal');
const closeRecipeBtn = getElement<HTMLButtonElement>('closeRecipeBtn');
const recipeTitle = getElement<HTMLHeadingElement>('recipeTitle');
const recipeImage = getElement<HTMLImageElement>('recipeImage');
const recipeIngredients = getElement<HTMLUListElement>('recipeIngredients');
const recipeSteps = getElement<HTMLOListElement>('recipeSteps');

// ========================================
// FUNCIONES DE INICIALIZACIÓN
// ========================================

/**
 * Inicializa la aplicación
 */
function init(): void {
    renderCarousel();
    renderProductsGrid();
    setupEventListeners();
    updateCartUI();
}

/**
 * Renderiza el carousel de productos
 */
function renderCarousel(): void {
    // Limpiar track
    carouselTrack.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Crear items del carousel
    products.forEach((product: Product, index: number) => {
        const item = createCarouselItem(product);
        carouselTrack.appendChild(item);

        // Crear indicador
        const indicator = document.createElement('button');
        indicator.className = 'carousel-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Ir a slide ${index + 1}`);
        indicator.addEventListener('click', () => goToSlide(index));
        carouselIndicators.appendChild(indicator);
    });
}

/**
 * Crea un item del carousel
 */
function createCarouselItem(product: Product): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'carousel-item';
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="carousel-image">
        <h4 class="carousel-product-name">${product.name}</h4>
        <p class="carousel-product-description">${product.description}</p>
        <div class="carousel-product-footer">
            <span class="carousel-product-price">$${product.price.toFixed(2)}</span>
            <button class="btn btn-primary" data-product-id="${product.id}">Comprar</button>
        </div>
    `;
    
    // Agregar event listener al botón
    const buyButton = div.querySelector('.btn-primary') as HTMLButtonElement;
    buyButton.addEventListener('click', () => addToCart(product.id));
    
    return div;
}

/**
 * Renderiza el grid de productos
 */
function renderProductsGrid(): void {
    productsGrid.innerHTML = '';
    products.forEach((product: Product) => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

/**
 * Crea una tarjeta de producto
 */
function createProductCard(product: Product): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-content">
            <h4 class="product-name">${product.name}</h4>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-buttons">
                <button class="btn btn-primary" data-action="buy" data-product-id="${product.id}">Comprar</button>
                <button class="btn btn-secondary" data-action="recipe" data-product-id="${product.id}">Ver Receta</button>
            </div>
        </div>
    `;
    
    // Agregar event listeners a los botones
    const buyButton = div.querySelector('[data-action="buy"]') as HTMLButtonElement;
    const recipeButton = div.querySelector('[data-action="recipe"]') as HTMLButtonElement;
    
    buyButton.addEventListener('click', () => addToCart(product.id));
    recipeButton.addEventListener('click', () => showRecipe(product.id));
    
    return div;
}

// ========================================
// FUNCIONES DEL CAROUSEL
// ========================================

/**
 * Navega a un slide específico
 */
function goToSlide(index: number): void {
    currentSlide = index;
    updateCarousel();
}

/**
 * Navega al siguiente slide
 */
function nextSlide(): void {
    currentSlide = (currentSlide + 1) % products.length;
    updateCarousel();
}

/**
 * Navega al slide anterior
 */
function prevSlide(): void {
    currentSlide = (currentSlide - 1 + products.length) % products.length;
    updateCarousel();
}

/**
 * Actualiza la visualización del carousel
 */
function updateCarousel(): void {
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;

    // Actualizar indicadores
    const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator: Element, index: number) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// ========================================
// FUNCIONES DEL CARRITO
// ========================================

/**
 * Añade un producto al carrito
 */
function addToCart(productId: number): void {
    const product = products.find((p: Product) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item: CartItem) => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification('Producto añadido al carrito');
}

/**
 * Elimina un producto del carrito
 */
function removeFromCart(productId: number): void {
    cart = cart.filter((item: CartItem) => item.id !== productId);
    updateCartUI();
    renderCart();
}

/**
 * Actualiza la interfaz del carrito
 */
function updateCartUI(): void {
    const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        cartCount.textContent = totalItems.toString();
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

/**
 * Renderiza el contenido del carrito
 */
function renderCart(): void {
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
        cartItems.innerHTML = '';
        return;
    }

    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = '';
    cart.forEach((item: CartItem) => {
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

/**
 * Crea un elemento de item del carrito
 */
function createCartItem(item: CartItem): HTMLDivElement {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <div class="cart-item-left">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div>
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-quantity">Cantidad: ${item.quantity}</p>
            </div>
        </div>
        <div class="cart-item-right">
            <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            <button class="cart-item-remove" data-product-id="${item.id}">Eliminar</button>
        </div>
    `;
    
    // Agregar event listener al botón de eliminar
    const removeButton = div.querySelector('.cart-item-remove') as HTMLButtonElement;
    removeButton.addEventListener('click', () => removeFromCart(item.id));
    
    return div;
}

/**
 * Muestra el modal del carrito
 */
function showCart(): void {
    renderCart();
    cartModal.style.display = 'flex';
}

/**
 * Oculta el modal del carrito
 */
function hideCart(): void {
    cartModal.style.display = 'none';
}

// ========================================
// FUNCIONES DE RECETA
// ========================================

/**
 * Muestra el modal de receta de un producto
 */
function showRecipe(productId: number): void {
    const product = products.find((p: Product) => p.id === productId);
    if (!product) return;

    recipeTitle.textContent = `Receta: ${product.name}`;
    recipeImage.src = product.image;
    recipeImage.alt = product.name;

    // Renderizar ingredientes
    recipeIngredients.innerHTML = '';
    product.recipe.ingredients.forEach((ingredient: string) => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        recipeIngredients.appendChild(li);
    });

    // Renderizar pasos
    recipeSteps.innerHTML = '';
    product.recipe.steps.forEach((step: string) => {
        const li = document.createElement('li');
        li.textContent = step;
        recipeSteps.appendChild(li);
    });

    recipeModal.style.display = 'flex';
}

/**
 * Oculta el modal de receta
 */
function hideRecipe(): void {
    recipeModal.style.display = 'none';
}

// ========================================
// FUNCIONES DE TEMA Y ACCESIBILIDAD
// ========================================

/**
 * Alterna entre modo claro y oscuro
 */
function toggleDarkMode(): void {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);

    if (darkMode) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

/**
 * Incrementa el tamaño de fuente
 */
function increaseFont(): void {
    if (fontSize < 24) {
        fontSize += 2;
        document.documentElement.style.fontSize = `${fontSize}px`;
        
        if (fontSize > 16) {
            resetFontBtn.style.display = 'block';
        }
    }
}

/**
 * Resetea el tamaño de fuente al valor por defecto
 */
function resetFont(): void {
    fontSize = 16;
    document.documentElement.style.fontSize = '16px';
    resetFontBtn.style.display = 'none';
}

// ========================================
// UTILIDADES
// ========================================

/**
 * Muestra una notificación al usuario
 */
function showNotification(message: string): void {
    // Implementación simple de notificación
    console.log(message);
    // Aquí podrías añadir un sistema de notificaciones más elaborado
}

/**
 * Cierra modales al hacer clic fuera del contenido
 */
function handleModalClick(event: MouseEvent, modal: HTMLElement): void {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Configura todos los event listeners de la aplicación
 */
function setupEventListeners(): void {
    // Botones de control
    increaseFontBtn.addEventListener('click', increaseFont);
    darkModeBtn.addEventListener('click', toggleDarkMode);
    cartBtn.addEventListener('click', showCart);
    resetFontBtn.addEventListener('click', resetFont);

    // Carousel
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Modales
    closeCartBtn.addEventListener('click', hideCart);
    closeRecipeBtn.addEventListener('click', hideRecipe);

    // Cerrar modales al hacer clic fuera
    cartModal.addEventListener('click', (e: MouseEvent) => handleModalClick(e, cartModal));
    recipeModal.addEventListener('click', (e: MouseEvent) => handleModalClick(e, recipeModal));

    // Navegación por teclado para el carousel
    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'Escape') {
            hideCart();
            hideRecipe();
        }
    });

    // Auto-play del carousel (opcional - descomentado si se desea)
    // setInterval(nextSlide, 5000);
}

// ========================================
// INICIAR APLICACIÓN
// ========================================

/**
 * Espera a que el DOM esté listo e inicializa la aplicación
 */
document.addEventListener('DOMContentLoaded', init);