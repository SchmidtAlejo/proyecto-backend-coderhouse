const { Router } = require("express");
const CartManager = require("../managers/CartManager");
const { join } = require("path");

const router = Router();
const rutaProducts = join(__dirname, "..", "data", "carrito.json");
const cartManager = new CartManager(rutaProducts);

router.post("/", (req, res) => {
    try {
        const cart = cartManager.createCart();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, cart });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

router.get("/:cid", (req, res) => {
    try {
        const products = cartManager.getProductsByCartId(req.params.cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, products });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

router.post("/:cid/product/:pid", (req, res) => {
    try {
        const cart = cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, cart });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

module.exports = router;