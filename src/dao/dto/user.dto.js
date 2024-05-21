export default class UserDTO {
  constructor(user) {
    this.user = user;
    delete this.user.password;
    delete this.user.__v;
  }
}