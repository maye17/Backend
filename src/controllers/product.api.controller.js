const ProductService = require('../services/product.api.service');
const productsService = new ProductService();

class ProductsController {

    async getAll (req,res) {
        try {
    
          
           const products = await productsService.getAllProducts();

          return  res.status(200).json({
                status:"OK",
                msg:"product list",
                payload:products,
            })
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "error", msg: "No se encontraron datos", data: {} })
            } else {
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
            }
        }
    
    }
    
   async getById (req, res) {
        try {
            const id = req.params.pid
          /*   const dataId = await productos.getProductById(parseInt(id)); */
    
          const dataId = await productsService.getProductById(parseInt(id))

          console.log(dataId)
            res.status(200).json(dataId)
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "error", msg: "No se encontro el producto", data: {} })
            } else {
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
            }
        }
    }
    
    /* 
    productsRouter.post("/", uploader.single("thumbnail"),  async (req, res) => {
        try {
        
            
            let newProduct = req.body;
            const createProduct = await productsService.addProduct(newProduct)
            newProduct.id = ((Math.random()*10000000).toFixed(0));
            newProduct.picture = "http://localhost:8080/" + req.file.filename;
     
            if (createProduct.find((item) => item.code === newProduct.code)) {
                return res.status(400).json({
                    status: "error",
                    msg: "Product already exists",
                    payload:{}
                })
            }
    
                productsService.addProduct(newProduct)
                return res.status(200).json({
                    status: "Ok",
                    msg: "Product added successfully",
                    payload: newProduct
                })
         
            
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ status: "error", msg: "Invalid input datos", data: {} })
            } else {
                res.status(500).json({ status: "error", msg: "Error in server", payload: {} })
            }
        }
    }) */
    
    async createOne (req,res) {
        try {
            
            const productData = req.body;
            const savedProduct = await productsService.addProduct(productData);

            return res.status(201).json({
                status: 'success',
                msg: 'Product created',
                payload: savedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
                status: 'error',
                msg: error.message,
                payload:{}
            });
        }
    };
    
    
    
    async updateOne   (req, res) {
        try {
            const _id = req.params.pid
    
           const productos = await productsService.getAllProducts();
            let changeProduct = req.body;
            productos.updateProduct(_id, changeProduct);
            return res.status(201).json({
                status: "Ok",
                msg: "product updated",
                data: changeProduct
            })
        } catch {
            res.status(500).json({ status: "error", msg: "Invalid input", data: {} })
        }
    }
    
     async deleteOne  (req, res) {
        try {
            const productId = req.params.id;
            const deletedProduct = await productsService.deleteProduct(productId);
            if (!deletedProduct) {
                return res.status(404).json({
                    status: 'error',
                    msg: 'Product not found',
                });
            }
            return res.status(200).json({
                status: 'success',
                msg: 'Product deleted',
                payload: deletedProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({
            status: 'error',
            msg: error.message,
            });
        }
    }
    
 async error (req, res) {
        res.status(404).json({ status: "error", msg: "Route not found", data: {} })
    }
    

}

module.exports = ProductsController;
