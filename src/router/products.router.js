const fs = require("fs");
const ProductManager = require("../ProductManager.js");

const products = new ProductManager ("./productos.json");
const productsRouter = express.Router();

productsRouter.get("/", (req,res)=> {
    try {
        const dataProduct = products.getProducts();
        const limit = req.query.limit
        const limitedProducts = limit ? dataProduct.slice(0, limit) : dataProduct;
        res.status(200).json(limitedProducts)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }

})

productsRouter.get("/:pid",  (req, res) => {
    try {
        const id = req.params.pid
        const dataId = products.getProductById(parseInt(id));
        res.status(200).json(dataId)
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }
})


productsRouter.post("/",  (req, res) => {
    try {
        const data =  products.getProducts();
        let newProduct = req.body;
        let findproduct = (data.find((ele) => ele.code === newProduct.code))
        if (findproduct) {
            return res.status(400).json({
                status: "error",
                msg: "Product already exists"
            })
        }
        const requiredField = ["title", "description", "code", "price", "stock", "category"]
        const allFields = requiredField.every(prop => newProduct[prop]);
        if (newProduct.id == undefined && allFields) {
            newProduct =
            {
                ...newProduct,
                id: data[data.length - 1].id + 1
            }
             products.addProduct({ ...newProduct, status: true })
            return res.status(200).json({
                status: "success",
                msg: "Product added successfully",
                data: newProduct
            })
        } else {
            res.status(400).json({
                status: "error",
                msg: "Invalid input"
            })
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
        } else {
            res.status(500).json({ status: "error", msg: "Error in server", data: {} })
        }
    }
})

productsRouter.put("/:pid",  (req, res) => {
    try {
        const id = req.params.pid
        const data =  products.getProducts()
        let changeProduct = req.body;
         products.updateProduct(id, changeProduct);
        return res.status(201).json({
            status: "Success",
            msg: "product updated",
            data: changeProduct
        })
    } catch {
        res.status(500).json({ status: "error", msg: "Invalid input", data: {} })
    }
})

productsRouter.delete("/:pid",  (req, res) => {
    try {
        const id = req.params.pid
        const data =  products.getProducts()
        let findProduct = data.find((prod) => prod.id == id)
        if (!findProduct) {
            return  res.status(400).json({
                    status: "error",
                    msg: "Product not found"
            })
        } else {
             products.deleteProduct(id);
            return res.status(201).json({
                status: "Success",
                msg: "product deleted",
                data: {}
            })
        }
    } catch {
        res.status(400).json({ status: "error", msg: "Invalid input", data: {} })
    }
}
)

productsRouter.get("*", (req, res) => {
    res.status(404).json({ status: "error", msg: "Route not found", data: {} })
})



module.exports =  productsRouter;