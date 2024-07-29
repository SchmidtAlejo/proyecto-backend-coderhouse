import ProductsService from '../services/products.service.js';
import UsersService from '../services/users.service.js';
import CartsService from '../services/carts.service.js';
import { verifyToken } from '../utils/utils.js';

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

  static error401 = (req, res) => {
    res.status(200).render('forgot-password');
  };

  static resetPassword = async (req, res) => {
    const { token } = req.params;
    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return res.status(400).send('Token is invalid or has expired');
    }

    res.render("restore-password", { token: token });
  }

  static adminUsers = async (req, res) => {
    const users = await UsersService.getAll();
    res.render('users', { users });
  }
}

export default ViewsController;