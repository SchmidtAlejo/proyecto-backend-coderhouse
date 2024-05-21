import { Router } from "express";
import { passportCall } from "../utils.js";
import ViewsController from "../controllers/views.controller.js";
import { CustomRouter } from "./routes.js";

// const router = Router();

// router.get("/", ViewsController.index);
// router.get("/chat", ViewsController.chat);
// router.get("/products", ViewsController.products);
// router.get("/carts/:cid", ViewsController.carts);
// router.get('/signup', ViewsController.signup);
// router.get('/login', ViewsController.login);
// router.get('/401', ViewsController.error401);

// export default router;

export default class ViewsRouter extends CustomRouter {
  init() {
    this.get("/", ['public'], ViewsController.index);
    this.get("/chat", ['public'], ViewsController.chat);
    this.get("/products", ['authenticated'], ViewsController.products);
    this.get("/carts/:cid", ['user'], ViewsController.carts);
    this.get('/signup', ['public'], ViewsController.signup);
    this.get('/login', ['public'], ViewsController.login);
    this.get('/401', ['public'], ViewsController.error401);
  }
}