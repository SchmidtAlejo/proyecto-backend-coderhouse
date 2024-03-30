import { modelMessage } from '../dao/models/message.model.js';

class MessageManager {

    async getMessages() {
        return await modelMessage.find();
    }

    async createMessage(name, message) {
        return await modelMessage.create({ name: name, message: message });
    }
}

export default MessageManager;