import { config } from 'dotenv'
config()

export default {
  jwt: {
    email: {
      secretKey: process.env.JWT_EMAIL_SECRET_KEY || 'EMAIL_JWT_SERCRET_KEY',
      expiresIn: process.env.JWT_EMAIL_EXPIRESIN || '1d'
    },
    access: {
      secretKey: process.env.JWT_ACCESS_SECRET_KEY || 'ACCESS_JWT_SECRET_KEY',
      expiresIn: process.env.JWT_ACCESS_EXPIRESIN || '15m'
    },
    refresh: {
      secretKey: process.env.JWT_REFRESH_SECRET_KEY || 'REFRESH_JWT_SECRET_KEY',
      expiresIn: process.env.JWT_REFRESH_EXPIRESIN || '1d'
    }
  }
}
