class UserInformation {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.todos = [];
  }
}
const users = [];

module.exports = { UserInformation: UserInformation, users: users };
