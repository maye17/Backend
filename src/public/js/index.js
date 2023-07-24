const socket =io();

//Creando la tabla de productos
let box = document.querySelector('.container-fluid','.box');
let btnAgregar = document.querySelector('#btn-agregar');
let table = document.querySelector('.table','.table-hover');
let thead = document.querySelector('thead');
let tbody = document.querySelector('tbody');
const btnAdd = document.querySelector('#btn-add')
const btnDelete = document.querySelector("#btn-Delete");
const btnChatPrincipal = document.querySelector("#btn-chat")




   /* chat colapse */

   const collapseBtn = document.querySelector('#collapse-btn');
const chatWindow = document.getElementById('chat-window');
const closeBtn = document.getElementById('close-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Función para mostrar u ocultar la ventana emergente del chat
function toggleChatWindow() {
  chatWindow.classList.toggle('show');
}

// Función para agregar un mensaje al chat
function addMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  chatMessages.appendChild(li);
}

// Evento clic en el botón de colapsar/expandir
collapseBtn.addEventListener('click', toggleChatWindow);

// Evento clic en el botón de cerrar
closeBtn.addEventListener('click', toggleChatWindow);

// Evento clic en el botón de enviar
/* sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  addMessage(message);
  messageInput.value = '';
}); */

// Simulación de mensajes recibidos
setTimeout(() => {
  addMessage('¡Hola!');
}, 1000);

setTimeout(() => {
  addMessage('¿En qué puedo ayudarte?');
}, 2000);


// Escuchando al servidor

socket.on('products',(productos)=>{
   console.log('producto nuevo',productos);
})
// formulario
let formulario = document.querySelector('#form-product');
const inputTitle = document.querySelector('#input-title');
const inputDes = document.querySelector('#input-des');

const inputPrice = document.querySelector('#input-price');
const inputCode = document.querySelector('#input-code');
const inputStock = document.querySelector('#input-stock');
inputImage = document.querySelector('#input-img');
const inputMarca = document.querySelector("#input-marca");
const inputDate = document.querySelector("#input-date");

//llamado al chat en página pricinpal

const openChat = (e)=>{
e.preventDefault();
console.log("probando ingresar al chat");
window.open('chat','_self' )
}

if(btnChatPrincipal){
  btnChatPrincipal.addEventListener('click', openChat)
}

// llamado al formulario de productos
const FormProduct = (e)=>{
    e.preventDefault();
    console.log('click');
    window.open('formulario','_self' )
    
}

if(btnAgregar){
    btnAgregar.addEventListener('click',FormProduct);
}

// creando producto

const EnviarProduct =(e)=>{
        e.preventDefault();

        const newProducts = {
            title:inputTitle.value,
            description: description.value,
            price: inputPrice.value,
            thumbnail:inputImage.value,
            code:inputCode.value,
            stock:inputStock.value,
            marca:inputMarca.value,
            date:inputDate.value
            
        }
  
        console.log('producto agregado',newProducts);
        socket.emit('new-Product',newProducts)
        toast.success('agregado con éxito!', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })

    }
    

if(btnAdd){
    btnAdd.addEventListener('click',EnviarProduct)

}

// actualizar producto



const removeProduct = (id) =>((productos.filter(article => article.id !== id),
        toast.error('Producto eliminado!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        ));

if(btnDelete){
  btnDelete.addEventListener('click',removeProduct)
}

// BUSCADOR


const buscador =document.querySelector('#buscador');
const btnBuscar = document.querySelector('#btnBuscar');
const resultado =document.querySelector('#resultado')

const filtrar = ()=> {
   console.log(buscador.value);
    resultado.innerHTML = '';
    const texto = buscador.value.toLowerCase();
    for (let productoBuscar of productos){
        let nombreProducto = productoBuscar.name.toLowerCase();
        if(nombreProducto.indexOf (texto) !== -1){
            resultado.innerHTML +=  `
            <div class="card mx-2 my-2 flex-shrink-1" style="width: 18rem;">
            <img src=${productoBuscar.thumbnail} class="card-img-top" alt="imagen">
            <div class="card-body">
              <h5 class="card-title">${productoBuscar.title}</h5>
              <p class="card-text">${productoBuscar.description}</p>
              <p class="card-text">${productoBuscar.marca}</p>
              <p>Código:${productoBuscar.code}</p>
              <a href="#" class="btn btn-primary">Agregar</a>
            </div>
          </div>`                  

        }
    }
    if(resultado.innerHTML ===''){
        resultado.innerHTML += `<h3>Producto no encontrado</h3>`
        
    }
}

/* btnBuscar.addEventListener('click', filtrar); */
//buscador.addEventListener('keyup',filtrar)



//creando chat
let userName = "";
async function main() {
  const { value: nombre } = await Swal.fire({
    title: "Enter your name",
    input: "text",
    inputLabel: "Your name",
    inputValue: "",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });
    userName = nombre;

}

main();





/* CHAT */

const chatBoxOne = document.querySelector("#textchat");



chatBoxOne.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      user: userName,
      msg: chatBoxOne.value,
      
    });
    chatBoxOne.value = "";
  }
});

socket.on("msg_back_to_front", (msgs) => {
    /*  console.log(JSON.stringify(data)); */
   
    let msgformat = "";
   
    msgs.forEach(msg => {
     let div ="";
     div += `
     <li class="other">
           <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
         <div class="msg">
           <p id="msg" class="msg-name">${msg.user}</p>    
           <p id="msg">${msg.msg}</p>    
         </div>
       </li>  
    `
   msgformat =div + msgformat
      
    });
     const msg = document.querySelector("#chat");
   
    msg.innerHTML =msgformat;
   });  
   
  