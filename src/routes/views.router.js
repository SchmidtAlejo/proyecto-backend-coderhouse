import ViewsController from "../controllers/views.controller.js";
import { CustomRouter } from "./routes.js";
export default class ViewsRouter extends CustomRouter {
  init() {
    this.get("/", ['public'], ViewsController.index);
    this.get("/chat", ['public'], ViewsController.chat);
    this.get("/products", ['authenticated'], ViewsController.products);
    this.get("/carts/:cid", ['user'], ViewsController.carts);
    this.get('/signup', ['public'], ViewsController.signup);
    this.get('/login', ['public'], ViewsController.login);
    this.get('/401', ['public'], ViewsController.error401);
    this.get('/forgot-password', ['public'], ViewsController.error401);
    this.get('/reset-password/:token', ['public'], ViewsController.resetPassword);
    this.get('/admin/users', ['admin'], ViewsController.adminUsers);
  }
}