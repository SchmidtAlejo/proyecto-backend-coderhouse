const express = require("express");
const PORT = 8080
const productRouter = require("./routes/product.router")
const cartRouter = require("./routes/cart.router")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => {
    console.log(`Server OK en puerto ${PORT}`)
})