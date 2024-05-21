import { modelMessage } from './models/message.model.js';

class MessageDAO {

    static async getMessages() {
        return await modelMessage.find();
    }

    static async createMessage(name, message) {
        return await modelMessage.create({ name: name, message: message });
    }
}

export default MessageDAO;