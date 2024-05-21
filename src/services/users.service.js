import UserDAO from "../dao/UserDAO.js";

class UserService {
  static async create(user) {
    return await UserDAO.create(user);
  }

  static async getBy(filter) {
    return await UserDAO.getBy(filter);
  }
}

export default UserService;