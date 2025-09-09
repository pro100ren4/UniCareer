import { Router } from 'express'
import { query } from 'express-validator'

import { registerNewUser } from '../controllers/AuthController.js'

export const AuthRouter = Router()

// AuthRouter endpoints
AuthRouter.post('/register', registerNewUser)
