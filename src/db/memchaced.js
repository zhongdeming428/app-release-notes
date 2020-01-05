const Memcached = require('memcached')
const config = require('../config')
const { isDev } = require('../utils')

memcachedConfig = (isDev() ? config.dev.memcached : config.prod.memcached)
const {
  host,
  port,
  ...restConfig
} = memcachedConfig

const client = new Memcached(`${host}:${port}`, { ...restConfig })

module.exports = client