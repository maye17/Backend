const socket =io();

//Creando la tabla de productos
let box = document.querySelector('.container-fluid','.box');
let btnAgregar = document.querySelector('#btn-agregar');
let table = document.querySelector('.table','.table-hover');
let thead = document.querySelector('thead');
let tbody = document.querySelector('tbody');
const btnAdd = document.querySelector('#btn-add')
const btnDelete = document.querySelector("#btn-Delete")


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
   