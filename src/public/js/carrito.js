const socket = io();

// variables
const procesarCompra = document.querySelector('#procesarCompra');

const botonVaciar = document.querySelector('#boton-vaciar');
let carritoId = null;
const divisa = '$';



// Obtener productos desde el servidor a través de Socket.io
socket.on("productos", (productos) => {
    // Maneja los productos recibidos desde el servidor
    // Puedes almacenarlos en una variable o en un estado, dependiendo de tu configuración
    console.log(productos);
});
  document.addEventListener("DOMContentLoaded", function () {
    const AddCart = document.querySelectorAll('.Add-Cart');
AddCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click para agregar al carrito',carritoId)
        carritoId = btn.getAttribute("data-product-id");
        socket.emit('agregar-al-carrito', carritoId);

     // agregarProductoCarrito(carritoId);
    })
})
  })

/* 
procesarCompra.addEventListener('click',ValidarProductosComprados)
// variable para incrementar el valor total en el carrito
const CarritoTotal = document.querySelector('#CarritoTotal');
const formulario = document.querySelector('#procesar-pago');
//formulario.addEventListener('submit', EnviarPedido)

// evento que guarda la información cuando se recarga la página, buscando la informaciónen en el local storage en caso de no contener muestra vacío
document.addEventListener('DOMContentLoaded',() => {
    carrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    mostrarCarrito();
})

// validando si oculta o no el modal
function ValidarProductosComprados(){
    if(carrito.length ===0){
        //agregando una alerta si el carrito esta vacio
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El carrito esta vacio!',
            color: '#000',
            background: '#fff',
            backdrop: `
              rgba(0,0,123,0.2)
              url("/assets/tarde-barry-allen.gif")
              left top
              no-repeat`,
              confirmButtonText:'Aceptar',
            footer: '<a href="./index.html">Agrega productos al carrito</a>'
          })
          
    }else {
            ProcesandoPedido();
    }
}


// llamando a la función vaciar carrito
botonVaciar.addEventListener('click',VaciarCarrito);
function VaciarCarrito() {
    carrito.length = [];
    mostrarCarrito();    
}

//agregando productos al carrito
function agregarProductoCarrito(carritoId) {

console.log('agregando producto al carrito',carritoId)
    //quitamos los productos duplicados e incrementamos la cantidad dentro del carrito
    const duplicado = carrito.some(product => product.id ===carritoId)
    if(duplicado){
        const product = carrito.map(product =>{
            if(product.id ===carritoId){
                product.cantidad ++;
            }
        })
    }else {
        //agregamos productos al carrito sino esta duplicado
        const item = products.find((product) => product.id === carritoId);
        carrito.push(item);
        Toastify({
            text: "producto agregado",
            duration: 3000,
            className: "info",
            style: {
              background: "linear-gradient(to right top, #05372a, #00633c, #289042, #62be39, #a8eb12)",
            }
          }).showToast();
    }

    mostrarCarrito();
}

//mostrando producto del carrito en el modal
const mostrarCarrito = () =>{
    const modalBody = document.querySelector('.modal .modal-body');
    modalBody.innerHTML="";
    carrito.forEach(product => {
        const {id, name,price, image,cantidad} = product
        modalBody.innerHTML +=`
        <div class="modal-contenedor">
            <div>
                <img class="img-fluid img-carrito" src="${image}">
            </div>
            <div>
                <p>Producto: ${name}</p>
                <p>Precio:  ${divisa} ${price}</p>
                <p>Cantidad: ${cantidad}</p>
                <button onclick="eliminarProductoCarrito(${id})" class= "btn btn-danger">Eliminar Producto</button>         
            </div>
        </div>`
    });   
    //recorriendo el carrito, si esta vacio muestra mensaje
    if(carrito.length===0){
        modalBody.innerHTML=`
        <p class="text-center text-primary">El carrito esta vacio</p>`
    }
    //recorriendo el carrito para conocer la cantidad de productos
    CarritoTotal.textContent = carrito.length;

    //calculando el precio total a pagar de los productos
    precioTotal.innerText= divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0);
    guardaLocalStorage();
}

//eliminar productos del carrito
function eliminarProductoCarrito(id) {
    const quitarId = id;
   carrito = carrito.filter((quitar) => quitar.id !== quitarId);
    mostrarCarrito();
    
}

//guardando en el local storage los productos ingresados al carrito
function guardaLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//cerrado el modal al procesar pedido


function ProcesandoPedido() {

    carrito.forEach((product)=>{
        const listCompra = document.querySelector('#lista-compra tbody');     
        const fila = document.createElement('row');
        const filaCompra   = document.createElement('tr')     
        const tdImg = document.createElement('td');
        tdImg.classList.add('img-fluid','img-carrito-pedido');
        const imgCompra =document.createElement('img')
        imgCompra.setAttribute('src',product.image);
        const tdNombre = document.createElement('td');
        tdNombre.innerText= product.name;
        const tdPrecio = document.createElement('td');
        tdPrecio.innerText= divisa + product.price;
        const tdCantidad = document.createElement('td');
        tdCantidad.innerText= product.cantidad;
        const tdSubTotal = document.createElement('td');
        tdSubTotal.innerText = divisa + product.cantidad*product.price ;

        tdImg.appendChild(imgCompra);    
        filaCompra.appendChild(tdImg);
        filaCompra.appendChild(tdNombre);
        filaCompra.appendChild(tdPrecio);
        filaCompra.appendChild(tdCantidad);
        filaCompra.appendChild(tdSubTotal);
        listCompra.appendChild(filaCompra);

    });
    totalCompra.innerText = divisa + carrito.reduce((acc,product) => acc + product.cantidad * product.price, 0);
    
    

    
} */