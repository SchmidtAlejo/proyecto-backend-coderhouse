import { modelCart } from '../dao/models/cart.model.js';

class CartManager {

    async createCart() {
        return modelCart.create({
            products: []
        });
    }

    async getProductsByCartId(id) {
        const cart = await modelCart.findById(id).populate('products.product').lean();
        return cart.products;
    }

    async addProductToCart(idCart, idProduct, quantity) {
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
        await modelCart.findByIdAndUpdate(idCart, { products });
    }

    async deleteProductFromCart(idCart, idProduct) {
        const products = await this.getProductsByCartId(idCart);
        const updatedProducts = products.filter(
            (product) => product.product._id.toString() !== idProduct
        );
        await modelCart.findByIdAndUpdate(idCart, { products: updatedProducts });
    }

    async updateCart(idCart, products) {
        await modelCart.findByIdAndUpdate(idCart, { products });
    }

    async updateQuantity(idCart, idProduct, quantity) {
        const products = await this.getProductsByCartId(idCart);
        const productIndex = products.findIndex(
            (product) => product.product._id.toString() == idProduct
        );
        if (productIndex === -1) {
            throw new Error('Product not found in cart');
        }
        products[productIndex].quantity = quantity;
        await modelCart.findByIdAndUpdate(idCart, { products });
    }

    async deleteProducts(idCart) {
        await modelCart.findByIdAndUpdate(idCart, { products: [] });
    }
}

export default CartManager;