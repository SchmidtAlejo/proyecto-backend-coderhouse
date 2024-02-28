const { Router } = require("express");
const ProductManager = require("../managers/ProductManager");
const { join } = require("path");


const router = Router();
const rutaProducts = join(__dirname, "..", "data", "productos.json");
const productManager = new ProductManager(rutaProducts);

router.get("/", (req, res) => {
    const products = productManager.getProducts();
    if (req.query.limit === undefined) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, products });
    }
    const result = products.slice(0, req.query.limit);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ "succes": true, result });
});

router.get("/:id", (req, res) => {
    try {
        const product = productManager.getProductById(req.params.id)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ "succes": true, product });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
});

router.post("/test", (req, res) => {
    try {
        const product1 = {
            title: "producto prueba",
            description: "Este es un producto prueba",
            price: 200,
            thumbnail: [],
            code: "abc123",
            status: true,
            stock: 25
        }

        const product2 = {
            title: "producto Testeo",
            description: "Este es un producto Testeo",
            price: 200,
            thumbnail: [],
            code: "cdf456",
            status: true,
            stock: 25
        }

        const product3 = {
            title: "producto Testeo 3",
            description: "Este es un producto Testeo 3",
            price: 200,
            thumbnail: [],
            code: "cdf45a6",
            status: true,
            stock: 25
        }

        const product4 = {
            title: "producto Testeo 4",
            description: "Este es un producto Testeo 4",
            price: 200,
            thumbnail: [],
            code: "cdfdas456",
            status: true,
            stock: 25
        }

        const product5 = {
            title: "producto Testeo 5",
            description: "Este es un producto Teste 5o",
            price: 200,
            thumbnail: [],
            code: "cdf56",
            status: true,
            stock: 25
        }

        const product6 = {
            title: "producto Testeo 6",
            description: "Este es un producto Testeo 6",
            price: 200,
            thumbnail: [],
            code: "cddasda56",
            status: true,
            stock: 25
        }

        productManager.addProduct(product1);
        productManager.addProduct(product2);
        productManager.addProduct(product3);
        productManager.addProduct(product4);
        productManager.addProduct(product5);
        productManager.addProduct(product6);

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ "succes": true });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

router.post("/", (req, res) => {
    try {
        const product = productManager.addProduct(req.body)
        res.status(201).json({ succes: true, product });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

router.put("/:pid", (req, res) => {
    try {
        const product = productManager.updateProduct(req.params.pid, req.body)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ succes: true, product });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

router.delete("/:pid", (req, res) => {
    try {
        productManager.deleteProduct(req.params.pid)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ succes: true });
    } catch (error) {
        res.status(400).json({ "succes": false, "error": error.message });
    }
})

module.exports = router;