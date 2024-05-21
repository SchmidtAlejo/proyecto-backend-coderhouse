import CartsService from "../services/carts.service.js";
import TicketService from "../services/tickets.service.js";
import ProductsService from "../services/products.service.js";
import { v4 as uuidv4 } from 'uuid';

class CartsController {
  static createCart = async (req, res) => {
    try {
      const cart = await CartsService.createCart();
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static getCartById = async (req, res) => {
    try {
      const cart = await CartsService.getProductsByCartId(req.params.cid);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static addProductToCart = async (req, res) => {
    try {
      const cart = await CartsService.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static deleteProductFromCart = async (req, res) => {
    try {
      const cart = await CartsService.deleteProductFromCart(req.params.cid, req.params.pid);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static updateCart = async (req, res) => {
    try {
      const cart = await CartsService.updateCart(req.params.cid, req.body.products);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static updateQuantity = async (req, res) => {
    try {
      const cart = await CartsService.updateQuantity(req.params.cid, req.params.pid, req.body.quantity);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static deleteProducts = async (req, res) => {
    try {
      const cart = await CartsService.deleteProducts(req.params.cid);
      res.success(cart);
    } catch (error) {
      res.badRequest(error.message);
    }
  }

  static purchase = async (req, res) => {
    try {
      const products = await CartsService.getProductsByCartId(req.params.cid);
      let amount = 0;
      let productsNoStock = [];
      for (const product of products) {
        const prd = await ProductsService.getProductById(product.product._id.toString());
        if (prd.stock < product.quantity) {
          productsNoStock.push({ product: prd, quantity: product.quantity });
        } else {
          amount += prd.price * product.quantity;
        }
      }
      const ticket = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: amount,
        purchaser: req.user.email,
      }
      const response = await TicketService.createTicket(ticket);
      console.log(productsNoStock);
      CartsService.updateCart(req.params.cid, productsNoStock);
      res.success({
        productsNoStock: productsNoStock,
        ticket: response
      });
    } catch (error) {
      res.badRequest(error.message);
    }
  }
}

export default CartsController;