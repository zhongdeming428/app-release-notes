module.exports = {
  dev: {
    db: {
      host: '127.0.0.1',
      user: 'root',
      password: '123456',
      database: 'd_app_release_notes',
      connectionLimit: 10,
      multipleStatements: true,
      debug: true
    },
    secret: '__private_secret_key__'
  },
  prod: {
    db: {}
  }
}