import CartsController from "../controllers/carts.controller.js";
import { CustomRouter } from "./routes.js";

export default class CartRouter extends CustomRouter {
    init() {
        this.post("/", ['user'], CartsController.createCart);
        this.get('/:cid', ['user'], CartsController.getCartById);
        this.post('/:cid/product/:pid', ['user'], CartsController.addProductToCart);
        this.delete('/:cid/product/:pid', ['user'], CartsController.deleteProductFromCart)
        this.put('/:cid', ['user'], CartsController.updateCart)
        this.put('/:cid/product/:pid', ['user'], CartsController.updateQuantity)
        this.delete('/:cid', ['user'], CartsController.deleteProducts)
        this.post('/:cid/purchase', ['user'], CartsController.purchase)
    }
}