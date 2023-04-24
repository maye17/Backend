// clase product Manager
// Primera Entrega

class ProductManager {
    constructor(){
        this.products=[];
        this.id =1;
    }

    addProduct(product){
       
       
        let valueCode = this.products.find((article) => article.code === product.code);

        if(!valueCode){
            if(product.title && product.description && product.price && product.thumbnail && product.code){
              let newProduct={...product, id: this.id}
                this.products.push(newProduct);
                 this.id ++;

                return 'product  added in my list'             
            
            } else {
                return 'Fields missing'
            }            
        }else {
            return 'This code already exists'
        }
       
    }

 
    getProducts(){

        return this.products
        
    }
    getProductById(id){

        let searchId = this.products.find((item)=> item.id === id)
        if(searchId){
           return searchId
        }else {
            console.log("Not found");
        }
    }
}

const product = {
    title:'Camisa De Hombre Slim Fit',
    description: 'Camisa De Hombre Slim Fit, Cuello camisero abotonado, Ajustado, Punta de puntilla de algodón premium, Botones de nácar, Insignia de cocodrilo verde en el pecho, Cotton (100%)',
    price:40.000,
    thumbnail:'https://www.lacoste.com/ar/lacoste/hombre/ropa/camisas/camisa-de-hombre-slim-fit/3666165451391.html?color=T01&gclid=Cj0KCQjwlumhBhClARIsABO6p-ymC4l5Hce_68x4PHdV9xwh8p-e3thi08rWS37P4nOIvnhIQvMzfawaAhnEEALw_wcB',
    code:'lacoste123',
    stock: 200,
  };

  const product2 = {
    title:'Camisa De Hombre Slim Fit',
    description: 'Camisa De Hombre Slim Fit, Cuello camisero abotonado, Ajustado, Punta de puntilla de algodón premium, Botones de nácar, Insignia de cocodrilo verde en el pecho, Cotton (100%)',
    price:40.000,
    thumbnail:'https://www.lacoste.com/ar/lacoste/hombre/ropa/camisas/camisa-de-hombre-slim-fit/3666165451391.html?color=T01&gclid=Cj0KCQjwlumhBhClARIsABO6p-ymC4l5Hce_68x4PHdV9xwh8p-e3thi08rWS37P4nOIvnhIQvMzfawaAhnEEALw_wcB',
    code:'lacoste123',
    stock: 200,
  };



const productsManager = new ProductManager();
console.log(productsManager.addProduct(product));
console.log(productsManager.addProduct(product2));
console.log(productsManager.getProducts());
console.log(productsManager.getProductById(32));
