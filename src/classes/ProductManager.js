import { modelProduct } from '../dao/models/product.model.js';
import products from '../data/products.js';

class ProductManager {

    async getProducts(limit, page, category, sort) {
        const q = category ? { category: category } : {};
        return await modelProduct.paginate(q, {
            limit: limit || 10,
            page: page || 1,
            sort: { price: Number.parseInt(sort) || 1 },
            lean: true
        });
    }

    async getProductById(id) {
        return await modelProduct.findById(id).lean();
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const product = {
            status: true,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        return await modelProduct.create(product);
    }

    async updateProduct(id, changes) {
        return await modelProduct.updateOne({ _id: id }, changes);
    }

    async deleteProduct(id) {
        return await modelProduct.deleteOne({ _id: id });
    }

    async test() {
        return await modelProduct.insertMany(products);
    }
}

export default ProductManager;