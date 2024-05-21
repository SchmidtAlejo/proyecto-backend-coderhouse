import MessageDAO from "../dao/MessageDAO.js";

class MessageService {
  static async getMessages() {
    return await MessageDAO.getMessages();
  }

  static async createMessage(name, message) {
    return await MessageDAO.createMessage(name, message);
  }
}

export default MessageService;
