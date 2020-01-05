const { execSql, escape } = require('../db/utils')
const dateformat = require('dateformat')

class noteService {
  static save(title, path, author) {
    const sql = `INSERT INTO d_app_release_notes.t_note (title, path, author) VALUES (${escape(title)}, ${escape(path)}, ${escape(author)});`
    return execSql(sql)
  }
  static getList(offset, limit) {
    const sql = `SELECT * FROM d_app_release_notes.t_note AS list LIMIT ${limit} OFFSET ${offset};`
    return execSql(sql).then(res => {
      return res.map(note => {
        note.create_time = dateformat(note.create_time, 'UTC:yyyy-mm-dd hh:mm::ss TT')
        note.update_time = dateformat(note.update_time, 'UTC:yyyy-mm-dd hh:mm::ss TT')
        return note
      })
    })
  }
  static get(id) {
    const sql = `SELECT * FROM d_app_release_notes.t_note AS note WHERE id = ${escape(id)} LIMIT 1;`
    return execSql(sql)
  }
  static delete(id) {
    const sql = `DELETE FROM d_app_release_notes.t_note WHERE id = ${escape(id)};`
    return execSql(sql)
  }
  static getTotal() {
    const sql = `SELECT COUNT(*) AS count FROM d_app_release_notes.t_note;`
    return execSql(sql)
  }
  static update(id, path, title, author) {
    const sql = `UPDATE d_app_release_notes.t_note SET path=${escape(path)}, title=${escape(title)}, author=${escape(author)} WHERE id=${id};`
    return execSql(sql)
  }
}

module.exports = noteService