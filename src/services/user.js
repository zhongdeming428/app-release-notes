const { execSql, escape } = require('../db/utils')

class User {
  static createAccount(userName, password) {
    const sql = `INSERT INTO d_app_release_notes.t_user (username, password) VALUES (${escape(userName)}, ${escape(password)})`

    return execSql(sql)
  }
}

module.exports = User