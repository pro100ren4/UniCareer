import { Router } from 'express'
import { query } from 'express-validator'

import {
    checkAuthMiddleware,
  loginUser,
  logoutUser,
  refreshToken,
  registerNewUser,
  requestResetPassword,
  resetUserPassword,
  verifyUserMail
} from '../controllers/AuthController.js'

export const AuthRouter = Router()

// TODO: Добавить валидацию

// AuthRouter endpoints
AuthRouter.post('/register', registerNewUser)
AuthRouter.post('/login', loginUser)
AuthRouter.post('/refresh', refreshToken)
AuthRouter.post('/logout', checkAuthMiddleware, logoutUser)
AuthRouter.get('/verify-email', verifyUserMail)
AuthRouter.post('/request-reset-password', requestResetPassword)
AuthRouter.post('/reset-password', resetUserPassword)
