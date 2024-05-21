import { CustomRouter } from './routes.js'
import ProductsController from "../controllers/products.controller.js"

export default class ProductRouter extends CustomRouter {
  init() {
    this.get("/", ['authenticated'], ProductsController.getProducts);
    this.get("/:id", ['authenticated'], ProductsController.getProductById);
    this.post("/test", ['admin'], ProductsController.test)
    this.post("/", ['admin'], ProductsController.addProduct);
    this.put("/:pid", ['admin'], ProductsController.updateProduct)
    this.delete("/:pid", ['admin'], ProductsController.deleteProduct)
  }
}
