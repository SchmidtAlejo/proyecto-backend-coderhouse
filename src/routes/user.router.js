import { CustomRouter } from './routes.js'
import UserController from "../controllers/users.controller.js"
import { uploadMulter } from '../config/multer.config.js';

export default class UserRouter extends CustomRouter {
  init() {
    this.get("/", ['admin'], UserController.getUsers);
    this.put("/premium/:uid", ['user', 'premium'], UserController.updateAlternatePremium);
    this.post("/:uid/documents", ['user', 'premium'], uploadMulter.array('documents', 10), UserController.uploadDocument);
    this.delete("/allusers", ['admin'], UserController.deleteAllUsers);
    this.post("/edit/:uid", ['admin'], UserController.updateUser);
    this.delete("/:uid", ['admin'], UserController.deleteUser);
    this.post('/test', ['public'], UserController.generateTest);
  }
}
