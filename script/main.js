document.getElementById("botoncerrar").addEventListener("click", () => {
  minimizarRubros();
});
function minimizarRubros() {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = '';
  document.getElementById("bazar").disabled = false;
  document.getElementById("cocina").disabled = false;
  document.getElementById("baño").disabled = false;
}


const productosBazar = [
  { nombre: "Black Mate", precio: 6500, imagen: "./media/bazar/blackmate.png" },
  { nombre: "Tetera difusora", precio: 4500, imagen: "./media/bazar/tetera.png" },
  { nombre: "Vaso termico", precio: 2500, imagen: "./media/bazar/vaso.png" },
  { nombre: "Taza doble fondo", precio: 3000, imagen: "./media/bazar/tazadoble.png" }
];

const productosCocina = [
  { nombre: "Especieros", precio: 1700, imagen: "./media/cocina/especiero.png" },
  { nombre: "Cubiertos", precio: 2200, imagen: "./media/cocina/cubiertos.png" },
  { nombre: "Cacerola", precio: 9800, imagen: "./media/cocina/cacerola.png" },
  { nombre: "Fuente", precio: 7000, imagen: "./media/cocina/fuente.png" }
];

const productosBaño = [
  { nombre: "Set plastico", precio: 9800, imagen: "./media/baño/setplastico.png" },
  { nombre: "Dispenser jabon", precio: 5000, imagen: "./media/baño/dispenser.png" },
  { nombre: "Tacho", precio: 15800, imagen: "./media/baño/tacho.png" },
  { nombre: "Cepillo", precio: 6700, imagen: "./media/baño/cepillo.png" }
];

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
  localStorage.setItem('carrito',JSON.stringify(carrito));
  actualizarTotalCarrito();
}

function actualizarTotalCarrito() {
  let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
  document.getElementById("Carrito").innerText = `Total del carrito: $${total}`;
}



