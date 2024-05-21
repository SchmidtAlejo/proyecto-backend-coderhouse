import CartDAO from "../dao/CartDAO.js"

class CartsService {
  static async createCart() {
    return await CartDAO.createCart()
  }

  static async getProductsByCartId(cartId) {
    return await CartDAO.getProductsByCartId(cartId);
  }

  static async addProductToCart(cartId, productId, quantity) {
    return await CartDAO.addProductToCart(cartId, productId, quantity);
  }

  static async deleteProductFromCart(cartId, productId) {
    return await CartDAO.deleteProductFromCart(cartId, productId);
  }

  static async updateCart(cartId, products) {
    return await CartDAO.updateCart(cartId, products);
  }

  static async updateQuantity(cartId, productId, quantity) {
    return await CartDAO.updateQuantity(cartId, productId, quantity);
  }

  static async deleteProducts(cartId) {
    return await CartDAO.deleteProducts(cartId);
  }
}

export default CartsService;