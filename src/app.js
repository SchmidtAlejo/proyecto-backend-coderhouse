import express from "express";
import http from 'http';
import ProductRouter from "./routes/product.router.js"
import { Server } from 'socket.io'
import CartRouter from "./routes/cart.router.js"
import ViewsRouter from "./routes/views.router.js"
import socketioRouter from "./routes/socketio.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import UserRouter from "./routes/user.router.js"
import mongoose from "mongoose"
import handlebars, { engine } from "express-handlebars";
import session from "express-session";
import cookieParser from 'cookie-parser'
import passport from 'passport';
import passportInit from './config/passport.config.js'
import { config, swaggerOptions } from "./config/config.js";
import { handleError } from "./middlewares/errors/index.js";
import cors from 'cors'
import { addLogger } from "./utils/logger.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
const viewsRouter = new ViewsRouter()
const userRouter = new UserRouter()

const PORT = config.SERVER_PORT

const app = express()

const httpServer = http.createServer(app);

const socketServer = new Server(httpServer)
const specs = swaggerJsDoc(swaggerOptions(__dirname));
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        eq: (a, b) => a === b
    }
}));

app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(addLogger)

app.use(cors())

passportInit()
app.use(session(
    {
        secret: config.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    }
))
app.use(passport.initialize())
app.use(passport.session())


app.use("/api/products", productRouter.getRouter());
app.use("/api/carts", cartRouter.getRouter());
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", userRouter.getRouter());
app.use("/", viewsRouter.getRouter());

const server = httpServer.listen(PORT, () => {
    console.log(`Server OK in port ${PORT}`)
})

app.use('/socketio', socketioRouter(socketServer));

const connect = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, { dbName: config.DB_NAME })
    } catch (error) {
        console.error(error.message)
    }
}

app.use(handleError)

connect()
