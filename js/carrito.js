

let carrito = [];


const contenedorTienda = document.getElementById('contenedorTienda');
const contenedorCarrito = document.getElementById('contenedorCarrito');
const botonCarrito = document.getElementById('mostrarCarrito');
const badgeCarrito = document.getElementById('badgeCarrito');
const divisa = '$';
const domItems = document.getElementById('items');
const domCarrito = document.getElementById('carrito');
const domTotal = document.getElementById('total');
const domBotonVaciar = document.getElementById('boton-vaciar');


fetch('js/productos.json')
    .then( (resp) => resp.json() )
    .then( (data) => {
    pintarCards(data)
        
    });
 


const pintarCards = (productos) => {

  for (const producto of productos) {
    const divcolumn = document.createElement('div'); // div para hacer columnas de bootstrap
    const divProducto = document.createElement('div'); //card
    const imgProducto = document.createElement('img'); // card imagen
    const bodyProducto = document.createElement('div');// card body
    const tituloProducto = document.createElement('h5'); // card titulo
    const descripProducto = document.createElement('p'); // card descripcion
    const precioProducto = document.createElement('h4');// precio
    const botonComprar = document.createElement('button');//boton
  
    divcolumn.className = 'col-md-3 mt-lg-0 mt-3'    // clases de bootstrap para columnas
    divProducto.className = 'card';                // clase card de bootstrap
    imgProducto.className = 'card-img-top';        // clase img bootstrap
    bodyProducto.className = 'card-body';          // clase cuerpo bootstrap
    tituloProducto.className = 'card-title';       // clase para titulo producto bootstrap
    descripProducto.className = 'card-text';       // clase para descripcion producto
    precioProducto.className = 'preciProducto';    // clase precio producto
    botonComprar.className = 'btn btn-primary';    //clase boton carrito bootstrap
  
    // img card
    imgProducto.src = producto.img;
    //titulo card
    tituloProducto.innerHTML = `${producto.producto}`;
    //descripcion card
    descripProducto.innerHTML = `${producto.tipo}`;
    // precio cards
    precioProducto.innerHTML = `$ ${producto.precio}`;
    //botones
    botonComprar.textContent = `Agregar Carrito`;
    // boton coincida con producto id
    botonComprar.id = producto.id;
  
  
    contenedorTienda.append(divcolumn);
    divcolumn.append(divProducto);
    divProducto.append(imgProducto, bodyProducto);
    bodyProducto.append(tituloProducto, descripProducto, precioProducto, botonComprar);
  
  
    // eventro click agregar al carrito y se guarda en localstorage
    botonComprar.onclick = () => {
      const productoComprado = productos.find(producto => producto.id === botonComprar.id);
      if(carrito.some(producto => producto.nombre === productoComprado.tipo)){
        carrito.find(elemento => elemento.nombre == producto.tipo).cantidad++;
        }else{
          carrito.push({ nombre: productoComprado.tipo, precio: productoComprado.precio,cantidad: productoComprado.cantidad})
  
        }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      badgeCarrito.innerHTML = carrito.length;
  
      Swal.fire({
        position: "bottom-end",
        imageUrl: `${producto.img}`,
        icon: `success`,
        imageWidth: `300px`,
        imageHeight: `200px`,
        title: `Has agregado "${producto.tipo}" a tu carrito`,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          icon: 'swal-icon',
          image: 'swal-image'
        }
        
      });
  
      console.log(carrito);
    }
  
    const aux = JSON.parse(localStorage.getItem("carrito"));
    if(aux != undefined){
      badgeCarrito.innerHTML = aux.length;
    }
}
}

















