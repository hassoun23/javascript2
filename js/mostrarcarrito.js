const listaCarrito = document.getElementById("listaCarrito");
const domCarrito = document.getElementById("carrito");
const domTotal = document.getElementById("total");
const clearBtn = document.getElementById("boton-vaciar");
const sumaTotal = () => {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  if (carrito != undefined) {
    const total = carrito.reduce(
      (accumulador, producto) => accumulador + producto.precio * producto.cantidad,
      0
    );
    domTotal.textContent = `Total Compra : ${total}`;
  }
};

function renderizarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito"));
  listaCarrito.innerHTML = ''
  for (const producto of carrito) {
    const nodoProductos = document.createElement("li");
    nodoProductos.classList.add ("list-group-item", "text-right", "mx-2","d-flex","justify-content-between");
    // nodoProductos.innerText = `${numeroUnidadesCarrito} x ${producto[0].producto} - ${producto[0].precio} ${divisa}`;
    nodoProductos.textContent = `${producto.nombre} - ${producto.precio} x ${producto.cantidad}`;
    const container = document.createElement("div");
    const botonBorrar = document.createElement("button");
    const botonSumar = document.createElement("button");
    const botonRestar = document.createElement("button");
    botonBorrar.classList.add("btn", "btn-danger", "mx-5");
    botonSumar.classList.add("btn", "btn-success", "mx-5","btn-sumar");
    botonRestar.classList.add("btn", "btn-danger", "mx-5","btn-restar");
    botonSumar.textContent = "+";
    botonRestar.textContent = "-";
    botonBorrar.textContent = "X";
    botonBorrar.style.marginLeft = "1rem";
    botonBorrar.id = carrito.id;
    container.append(botonRestar);
    container.append(botonSumar);
    container.append(botonBorrar);
    nodoProductos.append(container);
    listaCarrito.appendChild(nodoProductos);
    botonSumar.onclick = () => {
        producto.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
              renderizarCarrito();
    }
    botonRestar.onclick = () => {
        if (producto.cantidad <= 0){
            productosNuevo = carrito.filter( (p) => p.nombre !== producto.nombre );
            localStorage.setItem("carrito", JSON.stringify(productosNuevo));
            
                  renderizarCarrito();
        }else{

            producto.cantidad--;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            
                  renderizarCarrito();
        }
    }
    botonBorrar.onclick = () => {
    productosNuevo = carrito.filter( (p) => p.nombre !== producto.nombre );
    localStorage.setItem("carrito", JSON.stringify(productosNuevo));

      renderizarCarrito();
    }};
  sumaTotal();
}

renderizarCarrito();

clearBtn.addEventListener("click", (e) => {
  localStorage.clear();
  renderizarCarrito();
});
