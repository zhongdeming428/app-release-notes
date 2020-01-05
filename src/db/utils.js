const config = require('../config')
const mysql = require('mysql')

const isDev = require('../utils').isDev()

function getConnection() {
  const dbConfig = isDev ? config.dev.db : config.prod.db
  const { createConnection } = mysql
  const connection = createConnection(dbConfig)
  connection.connect()
  return connection
}

function execSql(sql) {
  return new Promise((resolve, reject) => {
    const conn = getConnection()
    conn.query(sql, (err, results, fields) => {
      isDev && console.log(`sql ===========>`, sql)
      if (err) {
        reject(err)
      }
      if (results) {
        isDev && console.log(`sql executed results =========>`, results)
        resolve(results)
      }
    })
    conn.on('end', () => {
      conn.end()
    })
  })
}

module.exports = {
  getConnection,
  execSql,
  escape: mysql.escape
}