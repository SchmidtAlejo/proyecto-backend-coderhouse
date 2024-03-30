import { Router } from "express";
import ProductManager from '../classes/ProductManager.js'
import CartManager from '../classes/CartManager.js'

const router = Router();

router.get("/", async (req, res) => {
    res.render('index');
});

router.get("/chat", async (req, res) => {
    res.render('chat');
});

router.get("/products", async (req, res) => {
    const productManager = new ProductManager();
    const { docs } = await productManager.getProducts();
    res.render('products', { products: docs });
});

router.get("/carts/:cid", async (req, res) => {
    const cartManager = new CartManager();
    const products = await cartManager.getProductsByCartId(req.params.cid);
    console.log(products);
    res.render('carts', { products: products });
});

export default router;