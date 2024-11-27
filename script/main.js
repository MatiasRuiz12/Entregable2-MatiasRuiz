document.addEventListener("DOMContentLoaded", () => {
  fetch('../JSON/producto.JSON')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar el archivo JSON');
      }
      return response.json();
    })
    .then(data => {
      const productosBazar = data.productosBazar;
      const productosCocina = data.productosCocina;
      const productosBaño = data.productosBaño;

      document.getElementById("bazar").addEventListener("click", () => {
        imprimirProductosEnHTML(productosBazar);
      });

      document.getElementById("cocina").addEventListener("click", () => {
        imprimirProductosEnHTML(productosCocina);
      });

      document.getElementById("baño").addEventListener("click", () => {
        imprimirProductosEnHTML(productosBaño);
      });

      cargarCarritoDesdeLocalStorage();
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
    });
});

function imprimirProductosEnHTML(productos) {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = '';
  productos.forEach((producto, index) => {
    const section = document.createElement("section");
    section.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button id="btn${index}">Comprar</button>
    `;
    contenedor.appendChild(section);
    const boton = document.getElementById(`btn${index}`);
    boton.addEventListener("click", () => agregarAlCarrito(producto));
  });
}

document.getElementById("btnborrar").addEventListener("click", () => {
  vaciarCarrito();
});

function vaciarCarrito() {
  carrito.length = 0;
  localStorage.removeItem('carrito');
  actualizarTotalCarrito();
  mostrarCarrito();
}

let carrito = [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarTotalCarrito();
  mostrarCarrito();
}

function actualizarTotalCarrito() {
  let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  document.getElementById("Carrito").innerText = `Total del carrito: $${total}`;
}

function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("carritoCompras");
  contenedorCarrito.innerHTML = '<h1>Este es tu carrito</h1>'; 
  carrito.forEach((producto, index) => {
    const itemCarrito = document.createElement("div");
    itemCarrito.innerHTML = `
    <img src="${producto.imagen}">
      <p>${producto.nombre} - Precio: $${producto.precio}</p>
      <button id="eliminar${index}">Eliminar</button>
    `;
    contenedorCarrito.appendChild(itemCarrito);
    document.getElementById(`eliminar${index}`).addEventListener("click", () => eliminarProducto(index));
  });
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarTotalCarrito();
  mostrarCarrito();
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarTotalCarrito();
    mostrarCarrito();
  }
}

document.getElementById("finalizarCompra").addEventListener("click", () => {
  finalizarCompra();
});

async function finalizarCompra() {
  try {
    if (carrito.length > 0) {
      const response = { ok: true, json: () => Promise.resolve({ success: true }) };

      if (!response.ok) {
        throw new Error('Error en la finalización de la compra');
      }

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem('carrito');
        document.getElementById("Carrito").innerText = `Total del carrito: $0`;
        document.getElementById("mensajeFinalizacion").innerText = "";
        Swal.fire({
          title: '¡Compra finalizada!',
          text: 'Gracias por tu compra.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        carrito.length = 0; 
        mostrarCarrito(); 
      } else {
        throw new Error(data.message || 'Error en la finalización de la compra');
      }
    } else {
      document.getElementById("mensajeFinalizacion").innerText = "El carrito está vacío. Agrega productos antes de finalizar la compra.";
    }
  } catch (error) {
    document.getElementById("mensajeFinalizacion").innerText = `Ocurrió un error: ${error.message}`;
  }
}

function minimizarRubros() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = '';
}
