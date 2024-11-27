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
        document.getElementById("bazar").disabled = true;
      });

      document.getElementById("cocina").addEventListener("click", () => {
        imprimirProductosEnHTML(productosCocina);
        document.getElementById("cocina").disabled = true;
      });

      document.getElementById("baño").addEventListener("click", () => {
        imprimirProductosEnHTML(productosBaño);
        document.getElementById("baño").disabled = true;
      });
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
  actualizarTotalCarrito();
}

const carrito = [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
  let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  document.getElementById("Carrito").innerText = `Total del carrito: $${total}`;
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
