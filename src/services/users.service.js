import UserDAO from "../dao/UserDAO.js";

class UserService {
  static async create(user) {
    return await UserDAO.create(user);
  }

  static async getBy(filter) {
    return await UserDAO.getBy(filter);
  }

  static async getAll() {
    return await UserDAO.getAll();
  }

  static async updateUser(userId, user) {
    return await UserDAO.updateLastConnection(userId, user);
  }

  static async updateLastConnection(userId) {
    return await UserDAO.updateLastConnection(userId);
  }

  static async deleteUser(userId) {
    return await UserDAO.deleteUser(userId);
  }

  static async deleteAllUser(time) {
    return await UserDAO.deleteAllUser(time);
  }

  static async generateTest() {
    return await UserDAO.generateTest();
  }
}

export default UserService;