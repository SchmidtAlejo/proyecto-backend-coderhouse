import CartsController from "../controllers/carts.controller.js";
import { verificateCartUser } from "../middlewares/auth.js";
import { CustomRouter } from "./routes.js";

export default class CartRouter extends CustomRouter {
    init() {
        this.post("/", ['user', 'premium'], CartsController.createCart);
        this.post('/:cid/product/:pid', ['user', 'premium'], verificateCartUser, CartsController.addProductToCart);
        this.post('/:cid/purchase', ['user', 'premium'], verificateCartUser, CartsController.purchase);
        this.get('/:cid', ['user', 'premium'], verificateCartUser, CartsController.getCartById);
        this.put('/:cid', ['user', 'premium'], verificateCartUser, CartsController.updateCart)
        this.put('/:cid/product/:pid', ['user', 'premium'], verificateCartUser, CartsController.updateQuantity)
        this.delete('/:cid/product/:pid', ['user', 'premium'], verificateCartUser, CartsController.deleteProductFromCart)
        this.delete('/allcarts', ['admin'], CartsController.deleteAllCarts)
        this.delete('/:cid', ['user', 'premium'], verificateCartUser, CartsController.deleteProducts)
    }
}