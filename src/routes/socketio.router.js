import express from 'express';
import MessageManager from '../classes/MessageManager.js';

const messageManager = new MessageManager();

const socketioRouter = (io) => {
    const router = express.Router();

    let users = []

    io.on("connection", socket => {
        console.log(`Client connected with id: ${socket.id}`)

        socket.on("welcome", async name => {
            users.push({ id: socket.id, name: name })
            socket.emit("record", await messageManager.getMessages());
            socket.broadcast.emit("newUser", name)
        })

        socket.on("message", async (name, message) => {
            await messageManager.createMessage(name, message);
            io.emit("newMessage", name, message)
        })

        socket.on("disconnect", () => {
            let user = users.find(u => u.id === socket.id)
            if (user) {
                socket.broadcast.emit("userLogout", user.name)
            }
        })
    })

    return router;
};

export default socketioRouter;