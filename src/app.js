import express from "express";
import http from 'http';
import productRouter from "./routes/product.router.js"
import { Server } from 'socket.io'
import cartRouter from "./routes/cart.router.js"
import viewsRouter from "./routes/views.router.js"
import socketioRouter from "./routes/socketio.router.js"
import mongoose from "mongoose"
import __dirname from './utils.js'
import handlebars from "express-handlebars";

const PORT = 8080

const app = express()

const httpServer = http.createServer(app);

const socketServer = new Server(httpServer)

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

const server = httpServer.listen(PORT, () => {
    console.log(`Server OK in port ${PORT}`)
})

app.use('/socketio', socketioRouter(socketServer));

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:tp2@cluster0.kuapk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { dbName: "coderBackend" })
    } catch (error) {
        console.error(error.message)
    }
}

connect()