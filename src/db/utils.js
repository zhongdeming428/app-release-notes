const config = require('../config')
const mysql = require('mysql')

const isDev = process.env.NODE_ENV === 'development'

function getConnection() {
  const isDev = process.env.NODE_ENV === 'development'
  const dbConfig = isDev ? config.dev.db : config.prod.db
  const { createConnection } = mysql
  const connection = createConnection(dbConfig)
  connection.connect()
  return connection
}

function execSql(sql) {
  return new Promise((resolve, reject) => {
    const conn = getConnection()
    conn.query(sql)
      .on('result', (result) => {
        isDev && console.log(`sql executed result =========>`, result)
        resolve(result)
      })
      .on('error', (err) => {
        isDev && console.log(`sql executed error =========>`, err)
        reject(err)
      })
      .on('end', () => {
        conn.end()
      })
  })
}

const NodeCache = require('node-cache')
const cache = new NodeCache()

module.exports = {
  getConnection,
  execSql,
  escape: mysql.escape,
  cache
}