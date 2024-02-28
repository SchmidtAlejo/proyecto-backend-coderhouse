const fs = require('fs');

class CartManager {
    constructor(path) {
        this.path = path
    }

    getCarts() {
        try {
            return JSON.parse(fs.readFileSync(this.path, { encoding: "utf-8" }));
        } catch (error) {
            fs.writeFileSync(this.path, JSON.stringify([], null, "\t"));
            return [];
        }
    }

    createCart() {
        const carts = this.getCarts();
        const cart = {
            id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
            products: []
        }
        carts.push(cart)
        this.writeFile(carts);
        return cart;
    }

    writeFile(carts) {
        {
            fs.writeFileSync(this.path, JSON.stringify(carts, null, "\t"));
        }
    }

    getProductsByCartId(id) {
        const carts = this.getCarts();
        const cart = carts.find(cart => cart.id === Number.parseInt(id));
        if (!cart) {
            throw new Error("The cart doesn´t exist");
        }
        return cart.products;
    }

    getIndex(id) {
        const carts = this.getCarts();
        const cart = carts.find(cart => cart.id === Number.parseInt(id));
        const products = this.getProductsByCartId(id);
        let index = -1;
        for (let i = 0; i < carts.length; i++) {
            if (carts[i].id === cart.id) {
                index = i;
                break;
            }
        }

        return { carts, cart, products, index };
    }

    addProductToCart(idCart, idProduct, quantity) {
        const { carts, products, index } = this.getIndex(idCart);
        const product = products.find(product => product.id === idProduct);
        if (!product) {
            carts[index].products.push({ id: idProduct, quantity: quantity });
        }
        else {
            const productIndex = carts[index].products.findIndex(product => product.id === idProduct);
            carts[index].products[productIndex].quantity += quantity;
        }
        this.writeFile(carts);
        return carts[index];
    }
}

module.exports = CartManager;