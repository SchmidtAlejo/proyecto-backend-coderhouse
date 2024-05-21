import { modelProduct } from './models/product.model.js';
import products from '../data/products.js';

class ProductDAO {

    static async getProducts(limit, page, category, sort) {
        const q = category ? { category: category } : {};
        return await modelProduct.paginate(q, {
            limit: limit || 10,
            page: page || 1,
            sort: { price: Number.parseInt(sort) || 1 },
            lean: true
        });
    }

    static async getProductById(id) {
        return await modelProduct.findById(id).lean();
    }

    static async addProduct({ title, description, price, thumbnail, category, stock }) {
        const product = {
            status: true,
            title,
            description,
            price,
            thumbnail,
            category,
            stock
        }

        return await modelProduct.create(product);
    }

    static async updateProduct(id, changes) {
        return await modelProduct.updateOne({ _id: id }, changes);
    }

    static async deleteProduct(id) {
        return await modelProduct.deleteOne({ _id: id });
    }

    static async test() {
        return await modelProduct.insertMany(products);
    }
}

export default ProductDAO;