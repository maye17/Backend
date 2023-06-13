const MongooseProducts = require('../models/products.model.js');

class ProductService {
    async getAllProducts(page, limit, sort, category, status) {
        try {
            const options = {}
            if(page){
                options.page = page || 1
            }
            if(limit){
                options.limit = limit || 5
            }
            if(sort){
                options.sort = { price: sort === 'desc' ? -1 : 1 };
            }

            const filter = {};
            if(category){
                filter.category = category || '';
            }
            if(status){
                filter.status = status || true;
            }

            const products = await MongooseProducts.paginate(filter, options);

            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await MongooseProducts.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(productData) {
        try {
            const product = await MongooseProducts.create(productData);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const product = await MongooseProducts.findByIdAndUpdate(
                productId,
                productData,
                { new: true }
            );
            return product;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await MongooseProducts.findByIdAndDelete(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ProductService;