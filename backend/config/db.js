import { config } from 'dotenv'
config()

export default {
  development: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: process.env.POSTGRES_DIALECT || 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'db',
    dialect: 'postgres'
  },
  production: {
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    host: 'db',
    dialect: 'postgres'
  }
}
