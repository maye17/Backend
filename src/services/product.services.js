const mongooseMatch = require('../dao/models/products.model');

class ProductService {
    async getAllProducts() {
        try {
            const products = await mongooseMatch.find().lean();
            console.log('products', products);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await mongooseMatch.findById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async createProduct(productData) {
        try {
            const product = await mongooseMatch.create(productData);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, productData) {
        try {
            const product = await mongooseMatch.findByIdAndUpdate(
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
            const product = await mongooseMatch.findByIdAndDelete(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = ProductService;