

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3088
  },

  db: {
    host: process.env.DEV_DB_HOST || '127.0.0.1',
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || 'travel_blog'
  },
  allowOrigin: process.env.DEV_ALLOW_ORIGIN || 'http://localhost:5173'
}


const prod = {
  app: {
    port: process.env.PRO_APP_PORT || 3058
  },

  db: {
    host: process.env.PRO_DB_HOST || '127.0.0.1',
    port: process.env.PRO_DB_HOST || 27017,
    name: process.env.PRO_DB_HOST || 'dbProd'
  },
  allowOrigin: process.env.PRO_ALLOW_ORIGIN || 'http://localhost:5173'
}


const config = { dev, prod}

const env = process.env.NODE_ENV || 'dev'

export default config[env]