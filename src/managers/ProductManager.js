const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path
    }

    getProducts() {
        try {
            return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }));
        } catch (error) {
            fs.writeFileSync(this.path, JSON.stringify([], null, "\t"));
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(product => product.id === Number.parseInt(id));
        if (!product) {
            throw new Error("The product doesn´t exist");
        }
        return product
    }

    writeFile(products) {
        {
            fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));
        }
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const products = this.getProducts();

        if (
            title === undefined || title.trim() === '' ||
            description === undefined || description.trim() === '' ||
            typeof price !== 'number' || isNaN(price) ||
            code === undefined || code.trim() === '' ||
            typeof stock !== 'number' || isNaN(stock)
        ) {
            throw new Error("Uno o más parámetros son inválidos.");
        }

        const aux = products.find(product => product.title === title)

        if (aux) {
            throw new Error("Ya existe un producto con el mismo título.");
        }

        const product = {
            id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
            status: true,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        products.push(product);
        this.writeFile(products);
        return product;
    }

    getIndex(id) {
        const products = this.getProducts();
        const product = this.getProductById(id);
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === product.id) {
                index = i;
                break;
            }
        }

        return { products, product, index };
    }

    updateProduct(id, changes) {
        const { products, product, index } = this.getIndex(id);
        products[index] = { ...product, ...changes, id: parseInt(id) };
        this.writeFile(products);
        return products[index];
    }

    deleteProduct(id) {
        console.log(id);
        const { products, index } = this.getIndex(id);
        products.splice(index, 1);
        this.writeFile(products);
    }
}

module.exports = ProductManager;