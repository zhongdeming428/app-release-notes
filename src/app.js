const express = require('express')
const routers = require('./controllers')
const { readFileSync } = require('fs')
const { resolve } = require('path')

class App {
  constructor() {
    this.app = express()
  }
  init() {
    this.initSetting()
    this.initMiddleware()
    this.initRouter()
    this.initDB()
    this.app.listen(3000, () => {
      console.log(`Server listening at port: <http://localhost:3000>`)
    })
  }
  initRouter() {
    this.app.use(...routers)
  }
  initSetting() {
    this.app.set('x-powered-by', false)
    this.app.set('view engine', 'ejs')
    this.app.set('views', resolve(__dirname, './views'))
  }
  initDB() {
    const execSql = require('./db/utils').execSql
    const createTable = readFileSync(resolve(__dirname, './db/create-tables.sql'), {
      encoding: 'utf8'
    }).toString()
    execSql(createTable)
      .catch(err => console.log(err))
  }
  initMiddleware() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(require('cookie-parser')())
    this.app.use(require('./middlewares/init'))
    this.app.use('/', express.static(resolve(__dirname, './public')))
  }
}

module.exports = new App()

