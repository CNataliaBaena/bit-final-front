# 🧁 Cupcake App - Frontend

Aplicación frontend desarrollada con Angular para la gestión de recetas de cupcakes.
Permite crear, visualizar, editar y eliminar recetas conectándose a un backend con API REST.

---

## 🚀 Tecnologías utilizadas

* Angular (Standalone Components)
* TypeScript
* HTML5
* CSS3 (Responsive Design)
* HTTP Client (para conexión con API)

---

## 📦 Funcionalidades

✔ Crear recetas de cupcakes
✔ Ver lista de recetas
✔ Editar recetas existentes
✔ Eliminar recetas
✔ Interfaz responsive (adaptable a móvil, tablet y desktop)

---

## 🔗 Conexión con el Backend

El frontend se conecta a la API en:

```bash
http://localhost:4000/recipes
```

### Endpoints utilizados:

* `GET /recipes` → Obtener todas las recetas
* `POST /recipes` → Crear receta
* `PUT /recipes/:id` → Actualizar receta
* `DELETE /recipes/:id` → Eliminar receta

---

## 📁 Estructura del proyecto

```
src/
 └── app/
     ├── app.ts        # Lógica principal (CRUD)
     ├── app.html      # Interfaz de usuario
styles.css             # Estilos globales
```

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <tu-repo>
cd cupcake-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar la aplicación:

```bash
ng serve
```

4. Abrir en navegador:

```bash
http://localhost:4200
```

---

## 📱 Responsive Design

La aplicación está optimizada para:

* 📱 Dispositivos móviles
* 📲 Tablets
* 💻 Escritorio

---

## 🧠 Consideraciones

* Asegúrate de que el backend esté corriendo en `localhost:4000`
* Verifica que el archivo `index.html` tenga:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 🛠 Posibles mejoras

* 🔍 Buscador de recetas
* 🌙 Modo oscuro
* 🖼 Imágenes para cupcakes
* 🔐 Autenticación de usuarios
* ⭐ Favoritos

---

## 👨‍💻 Autor Natalia Baena Cabas

Proyecto desarrollado como práctica Full Stack.

---
