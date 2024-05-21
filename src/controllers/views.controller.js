import { passportCall } from "../utils.js";
import ProductsService from '../services/products.service.js';
import CartsService from '../services/carts.service.js';

class ViewsController {
  static index = async (req, res) => {
    res.render('index');
  };

  static chat = (req, res) => {
    res.render('chat');
  };

  static products = async (req, res) => {
    const { docs } = await ProductsService.getProducts();
    res.render('products', { products: docs });
  };

  static carts = async (req, res) => {
    const products = await CartsService.getProductsByCartId(req.params.cid);
    console.log(products);
    res.render('carts', { products: products, cartId: req.params.cid });
  };

  static signup = (req, res) => {
    let { error, message } = req.query;
    res.status(200).render('signup', { error, message });
  };

  static login = (req, res) => {
    res.status(200).render('login');
  };

  static error401 = (req, res) => {
    res.status(200).render('401');
  };
}

export default ViewsController;