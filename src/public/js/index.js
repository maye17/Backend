const socket =io();
//Creando la tabla de productos

let box = document.querySelector('.container-fluid','.box');
let btnAgregar = document.querySelector('#btn-agregar');
let table = document.querySelector('.table','.table-hover');
let thead = document.querySelector('thead');
let tbody = document.querySelector('tbody');
const btnAdd = document.querySelector('#btn-add')

const btnEdit = document.querySelector("#btn-Edit");




   /* chat colapse */
   const btnChatPrincipal = document.querySelector("#btn-chat")

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
function ShowMessage(message) {
  const li = document.createElement('li');
  li.textContent = message;
  chatMessages.appendChild(li);
}

/* // Evento clic en el botón de colapsar/expandir
collapseBtn.addEventListener('click', toggleChatWindow);

// Evento clic en el botón de cerrar
closeBtn.addEventListener('click', toggleChatWindow); */

// Evento clic en el botón de enviar
/* sendBtn.addEventListener('click', () => {
  const message = messageInput.value;
  addMessage(message);
  messageInput.value = '';
}); */

// Simulación de mensajes recibidos
/* setTimeout(() => {
  addMessage('¡Hola!');
}, 1000);

setTimeout(() => {
  addMessage('¿En qué puedo ayudarte?');
}, 2000);
 */

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
        socket.emit('new-Product',newProducts);       
        Toastify({
          text: "Producto agregando con éxito!",
          className: "info",
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          }
        }).showToast();
          

        formulario.reset();
    }
    

if(btnAdd){
    btnAdd.addEventListener('click',EnviarProduct)

}

// actualizar producto

const updateProducts = (id) => {
    const product = updateProduct.find((article) => article.id === id);
    console.log(product);
    inputTitle.value = product.title;
    inputDes.value = product.description;
    inputPrice.value = product.price;
    inputImage.value = product.thumbnail;
    inputCode.value = product.code;
    inputStock.value = product.stock;
    inputMarca.value = product.marca;
    inputDate.value = product.date;
    btnAdd.style.display = "none";
    btnEdit.style.display = "block";


    btnEdit.addEventListener("click", () => {
      const updateProduct = {
        title: inputTitle.value,
        description: inputDes.value,
        price: inputPrice.value,
        thumbnail: inputImage.value,
        code: inputCode.value,
        stock: inputStock.value,
        marca: inputMarca.value,
        date: inputDate.value,
      };
      socket.emit("update-product", id, updateProduct);
      btnAdd.style.display = "block";
      btnEdit.style.display = "none";
      Toastify({
        text: "Producto editado con éxito!",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
    });

    socket.on('productUpdated', updatedProduct => {
      console.log('Producto actualizado:', updatedProduct);
      // Realizar acciones adicionales después de la actualización en el frontend
    });
  
  };


  if(btnEdit){
    btnEdit.addEventListener('click',updateProducts)
  }

/* const removeProduct = (productId) =>((deleteProduct.filter(article => article.id !== id),
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
 */
//elimando producto
        const productId = document.querySelector('#code');
        const btnGroup = document.querySelector(".btn-group");    
        const btnDelete = document.querySelector(".delete-button");




const removeProduct = (e) => {
  e.preventDefault();
 
  console.log('click')
  socket.emit('deleteProducts', productId)

};

// Escuchar la respuesta del backend y manejar la eliminación en el frontend

socket.on('deleteProducts', deleteProductList => {
  console.log('Producto eliminado:', deleteProductList);
  socket.emit('deleteProducts', productId)
  // Realizar acciones adicionales después de la eliminación en el frontend

  Toastify({
    text: "Producto eliminado!",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
});
if(btnDelete){
  btnDelete.addEventListener('click',removeProduct)
}


/* const btnDelete = document.querySelector(".delete-button");


if (btnDelete instanceof NodeList) {
  btnDelete.forEach((button) => {
    button.addEventListener('click', () => {
    const productId = button.getAttribute('id');
    deleteProduct(productId);
    })
  });
} else {
  console.log('no se encontraron bottones')
}

const deleteProduct = (productId) => {
  socket.emit('deleteProducts', productId)
  console.log('click')
};


// Escuchar la respuesta del backend y manejar la eliminación en el frontend
socket.on('deleteProducts', deleteProducts => {
  console.log('Producto eliminado:', deleteProducts);
  // Realizar acciones adicionales después de la eliminación en el frontend
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
});

 */
//inicio sesión

/* const login = document.querySelector('#ingresar');
const logout = document.querySelector('#logout');


function iniciarSesion() {
  console.log('click');
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const user = {
      email: email,
      password: password
  }

  fetch('/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
  })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data.status === 'ok') {
              window.location.href = '/';
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...', 
                  text: 'Usuario o contraseña incorrectos!',
                  footer: '<a href>Why do I have this issue?</a>'
                })
          }
      })
      .catch(err => console.log(err));
}


login.addEventListener('click', iniciarSesion); */








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
  const { value: nombre } = await  Swal.fire({
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
//ocultando chat
const chatBoxOne = document.querySelector("#textchat");





/* chatBoxOne.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    console.log("click")
    socket.emit("msg_front_to_back", {
      user: userName,
      msg: chatBoxOne.value,

    });
    chatBoxOne.value = "";
  }
}); */

chatBoxOne.addEventListener("keyup", (e) => {
  e.preventDefault()

  if (e.key == "Enter") {
    console.log("apretando",e.key)
    socket.emit("msg_front_to_back", {
      user: userName,
      msg: chatBoxOne.value,

    });
    chatBoxOne.value = "";
  }
});

socket.on("msg_back_to_front", (newMessage) => {
    // console.log(JSON.stringify(data)); 
   
    let msgformat = "";
   
    newMessage.forEach(mensa => {
     let div ="";
     div += `
      <li class="other">
           <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
         <div class="msg">
            <p id="msg" class="msg-name">${mensa.user}</p>    
           <p id="msg">${mensa.msg}</p>    
         </div>
      </li>  
    `
   msgformat =div + msgformat
      
    });
  //  const msg = document.querySelector("#textchat").value;
    const chating = document.querySelector("#chat");
    chating.innerHTML =msgformat;
   });  
   

//Agregando al carrito

let carrito=[];	






















/* socket.on("msg_back_to_front", (newMessage) => {
    const messages = document.querySelector("#chat");
    const li = document.createElement("li");
    li.innerHTML = `<strong>${newMessage.userName}</strong>: ${newMessage.chatBoxOne}`;
    messages.appendChild(li);
  }); */
/*  socket.emit('new-Product',newProducts) */


/* chatBoxOne.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      user: userName,
      msg: chatBoxOne.value,
      
    });
    chatBoxOne.value = "";
  }
});
 */


/* socket.on("msg_back_to_front", (msgs) => {
    // console.log(JSON.stringify(data)); 
   
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
   });   */
   
   


   //guardar mensaje
/* 
 const chatBoxTwo = document.querySelector("#textchatTwo"); 
   chatBoxTwo.addEventListener("keyup", ({ key }) => {
    if (key == "Enter") {

    const newMessage = {
        user:userName,
        message: chatBoxTwo.value,    
    }
    socket.emit('new-mesagge',newMessage)
    chatBoxTwo.value = "";

    console.log('mensaje guardado',newMessage);

}
   })

   
socket.on("msg_back_to_front", (newMessage) => {

  let msgsformat = "";
 
  newMessage.forEach(msg => {
   let divTwo ="";
   divTwo += `
   <li class="other">
         <div id="avatar" class="avatar"><img id="imgAvatar" src="https://i.imgur.com/DY6gND0.png" draggable="false"/></div>
       <div class="msg">
          <p id="msg" class="msg-name">${msg.user}</p>    
         <p id="msg">${msg.chating}</p>    
       </div>
     </li>  
  `
  msgsformat =divTwo + msgsformat
    
  });
   const chating = document.querySelector("#chating");
 
   chating.innerHTML =msgsformat;
 });  

 */

/* 
  logout.addEventListener('click', () => {
    socket.emit('logout', userName);
  }
  ); */

/*   socket.on('login', (userName) => {
    console.log(`${userName} se ha conectado`);
  }
  );
 */