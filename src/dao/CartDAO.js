import { modelCart } from './models/cart.model.js';

class CartDAO {

    static async createCart() {
        return modelCart.create({
            products: []
        });
    }

    static async getProductsByCartId(id) {
        const cart = await modelCart.findById(id).populate('products.product').lean();
        return cart.products;
    }

    static async addProductToCart(idCart, idProduct, quantity) {
        const products = await this.getProductsByCartId(idCart);
        const productExists = products.some(product => product.product._id.toString() === idProduct);
        if (productExists) {
            throw new Error('Product already exists in cart');
        }
        const newProduct = {
            product: idProduct,
            quantity: quantity
        }
        products.push(newProduct);
        return await modelCart.findByIdAndUpdate(idCart, { products });
    }

    static async deleteProductFromCart(idCart, idProduct) {
        const products = await this.getProductsByCartId(idCart);
        const updatedProducts = products.filter(
            (product) => product.product._id.toString() !== idProduct
        );
        return await modelCart.findByIdAndUpdate(idCart, { products: updatedProducts });
    }

    static async updateCart(idCart, products) {
        return await modelCart.findByIdAndUpdate(idCart, { products });
    }

    static async updateQuantity(idCart, idProduct, quantity) {
        const products = await this.getProductsByCartId(idCart);
        const productIndex = products.findIndex(
            (product) => product.product._id.toString() == idProduct
        );
        if (productIndex === -1) {
            throw new Error('Product not found in cart');
        }
        products[productIndex].quantity = quantity;
        return await modelCart.findByIdAndUpdate(idCart, { products });
    }

    static async deleteProducts(idCart) {
        return await modelCart.findByIdAndUpdate(idCart, { products: [] });
    }
}

export default CartDAO;