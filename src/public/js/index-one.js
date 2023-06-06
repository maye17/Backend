const socket =io();

//Creando la tabla de productos


let box = document.querySelector('.container-fluid','.box');
let btnAgregar = document.querySelector('#btn-agregar')
let table = document.querySelector('.table','.table-hover')
;
let thead = document.querySelector('thead')
let tbody = document.querySelector('tbody')

const Tabla =()=>{

    const row = document.createElement("tr");
    const columnTitle = document.createElement("th");
    columnTitle.setAttribute('id', 'title')
    columnTitle.innerText='Titulo';
    row.appendChild(columnTitle);

    const columnDes = document.createElement("th");
    columnDes.setAttribute('id', 'description')
    columnDes.innerText='Descripción';
    row.appendChild(columnDes);

    const columnPrice = document.createElement("th");
    columnPrice.setAttribute('id', 'Price')
    columnPrice.innerText='Precio';
    row.appendChild(columnPrice);

    const columnThumbnail = document.createElement("th");
    columnThumbnail.setAttribute('id', 'thumbnail')
    columnThumbnail.innerText='Imagen';
    row.appendChild(columnThumbnail);

    const columnCode = document.createElement("th");
    columnCode.setAttribute('id', 'code')
    columnCode.innerText='Código';
    row.appendChild(columnCode);

    const columnStock = document.createElement("th");
    columnStock.setAttribute('id', 'stock')
    columnStock.innerText='Stock';
    row.appendChild(columnStock);

    const columnActions = document.createElement("th");
    columnActions.setAttribute('id', 'actions')
    columnActions.innerText='Acciones';
    row.appendChild(columnActions);



    thead.appendChild(row)
    table.appendChild(thead)

}

Tabla();
const MostrarProductos= async () => {
    
    let productFetch = await fetch('/productos.json');
    let productJson = await productFetch.json();

    productJson.forEach((product) =>{

    const bodyRow = document.createElement("tr");
    const bodyColumnTitle = document.createElement('td'); bodyColumnTitle.setAttribute('id','coltitle')
     bodyColumnTitle.innerText =`${product.title}`;
     bodyRow.appendChild(bodyColumnTitle);
    tbody.appendChild(bodyRow)


    const bodycolumnwDes = document.createElement('td');
    bodycolumnwDes.setAttribute('id','description');
    bodycolumnwDes.innerText=`${product.description}`;
    bodyRow.appendChild(bodycolumnwDes);

    const bodycolumnPrice = document.createElement('td');
    bodycolumnPrice.setAttribute('id','price');
    bodycolumnPrice.innerText=`${product.price}`;
    bodyRow.appendChild(bodycolumnPrice);
    
    const bodycolumnImag = document.createElement('td');
    bodycolumnImag.setAttribute('id','thumbnail');
    bodycolumnImag.innerText=`${product.thumbnail}`;
    bodyRow.appendChild(bodycolumnImag);

    const bodycolumnCode = document.createElement('td');
    bodycolumnCode.setAttribute('id','code');
    bodycolumnCode.innerText=`${product.code}`;
    bodyRow.appendChild(bodycolumnCode);

    const bodycolumnStock = document.createElement('td');
    bodycolumnStock.setAttribute('id','stock');
    bodycolumnStock.innerText=`${product.stock}`;
    bodyRow.appendChild(bodycolumnStock);

    const bodycolumnActions = document.createElement('td');
    bodycolumnActions.setAttribute('id','stock');
    bodyButtonEdit = document.createElement('button');
    
    bodyRow.appendChild(bodycolumnActions);
    


        table.appendChild(tbody);
        box.appendChild(table)
    }); 


}

MostrarProductos();

/* btnAgregar.addEventListener('click',agregar);

const agregar =(e)=>{
    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDes.value
    }
} */


/* socket.on("msg_front_to_back", (data)=>{
    console.log(JSON.stringify(data));
    socket.emit("msg_front_to_back",{msg: "hola desde el front del socket"})
}) */