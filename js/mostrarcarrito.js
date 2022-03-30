const listaCarrito = document.getElementById("listaCarrito");
const domCarrito = document.getElementById('carrito');
const domTotal = document.getElementById('total');
const clearBtn = document.getElementById("boton-vaciar");
const sumaTotal = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if(carrito != undefined){
        const total = carrito.reduce((accumulador, producto) => accumulador + producto.precio, 0);
        domTotal.textContent = `Total Compra : ${total}`;
    }
};

function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito"));
    if(carrito == undefined){
        let lastChild = listaCarrito.lastElementChild;
        while(lastChild){
            listaCarrito.removeChild(lastChild);
            lastChild = listaCarrito.lastElementChild;
        }
        domTotal.textContent = `Total Compra : ${0}`;
    } else{
        for (const producto of carrito) {
            const nodoProductos = document.createElement('li');
            nodoProductos.className = 'list-group-item', 'text-right', 'mx-2'
            // nodoProductos.innerText = `${numeroUnidadesCarrito} x ${producto[0].producto} - ${producto[0].precio} ${divisa}`;
            nodoProductos.textContent = `${producto.nombre} - $${producto.precio}`;
            listaCarrito.appendChild(nodoProductos);
        };
    }

    sumaTotal();
}

renderizarCarrito();







clearBtn.addEventListener("click", (e) => {
    localStorage.clear();
    renderizarCarrito();
});