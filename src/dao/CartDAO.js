import { modelCart } from './models/cart.model.js';
import ProductDao from './ProductDAO.js'

class CartDAO {

    static async createCart(uid) {
        return await modelCart.create({
            products: [],
            user: uid
        });
    }

    static async getCartById(id) {
        return await modelCart.findById(id).populate('products.product').lean();
    }

    static async getProductsByCartId(id) {
        const cart = await modelCart.findById(id).populate('products.product').lean();
        return cart.products;
    }

    static async addProductToCart(idCart, idProduct, quantity) {
        const cart = await this.getCartById(idCart);
        const product = await ProductDao.getProductById(idProduct);
        if (!product) throw new Error('Product not found');
        if (product.stock < quantity) throw new Error('Not enough stock');
        const productExists = cart.products.some(product => product.product._id.toString() === idProduct);
        if (cart.user.toString() === product.owner.toString()) {
            throw new Error('You cannot add your own product to your cart');
        }
        if (productExists) {
            throw new Error('Product already exists in cart');
        }
        const newProduct = {
            product: idProduct,
            quantity: quantity
        }
        cart.products.push(newProduct);
        await modelCart.findByIdAndUpdate(idCart, { products: cart.products })
        return newProduct;
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