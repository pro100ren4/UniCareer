import { Router } from 'express'
import { query } from 'express-validator'

import { loginUser, logoutUser, refreshToken, registerNewUser } from '../controllers/AuthController.js'

export const AuthRouter = Router()

/**
 * TODO: Добавить валидацию
 */

// AuthRouter endpoints
AuthRouter.post('/register', registerNewUser)
AuthRouter.post('/login', loginUser)
AuthRouter.post('/refresh', refreshToken)
AuthRouter.post('/logout', logoutUser)
