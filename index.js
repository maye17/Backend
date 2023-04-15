// clase product Manager

class ProductManager {
    constructor(){
        this.products=[];
        this.id =1;
    }

    addProduct(product){
       
        let valueCode = this.products.find((article) => article.code === product.code);
        if(valueCode){
            return 'This code already exists';
        
        }
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code){
             return 'Fields missing';
        }
         let newProduct;
        newProduct={...product, id: this.id}
        this.products.push(newProduct);
        this.id ++;
                return'product added';
    }

 
    getProducts(){

        return this.products
        
    }
    getProductById(id){

        let searchId = this.products.find((item)=> item.id === id)
        if(!searchId){
           return searchId
        }else {
            console.log("Not found");
        }
    }
}

const product = {

    title:'titulos',
    description:'rpuebas' ,
    price:10,
    thumbnail:'sin imagen',
    code:'3',
    stock:30,
};


const productsManager = new ProductManager();
const result = productsManager.addProduct(product)
console.log(result);
/* console.log(productsManager.getProducts(product)); */
