import { Router } from "express";
import CartManager from "../classes/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const products = await cartManager.getProductsByCartId(req.params.cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success", products });
    } catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const cart = await cartManager.deleteProductFromCart(req.params.cid, req.params.pid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
})

router.put("/:cid", async (req, res) => {
    try {
        await cartManager.updateCart(req.params.cid, req.body.products);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    try {
        await cartManager.updateQuantity(req.params.cid, req.params.pid, req.body.quantity);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
})


router.delete("/:cid", async (req, res) => {
    try {
        await cartManager.deleteProducts(req.params.cid);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ status: "success" });
    }
    catch (error) {
        res.status(400).json({ status: "error", "error": error.message });
    }
})

export default router;