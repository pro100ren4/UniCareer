import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import db from '../models/index.js'

/* REQUEST HANDLERS */
export async function registerNewUser(req, res) {
  const { email, password, role } = req.body

  if (!email || !password || !role) {
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Missing required parameter',
      details: {
        field: !email ? 'email' : !password ? 'password' : 'role',
        issue: 'Missing'
      }
    })
  }

  const isUserAlreadyExists = await db['User'].findOne({ where: { email: email } })
  if (isUserAlreadyExists) {
    return res.status(409).json({
      code: 'VALIDATION_ERROR',
      message: 'Dublicate',
      details: {
        field: 'email',
        issue: 'already exist'
      }
    })
  }

  const password_hash = await bcrypt.hash(password, 10)

  const user = await db['User'].create({
    email,
    password_hash,
    role,
    is_active: true
  })

  const token = jwt.sign({ id: user.id, email: user.email }, 'JWT_SERCRET_KEY', { expiresIn: '1d' })
  res.status(201).json({ token })
}

export async function loginUser(req, res) {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Missing required parameter',
      details: {
        field: !email ? 'email' : 'password',
        issue: 'Missing'
      }
    })
  }

  const user = await db['User'].findOne({
    where: {
      email: email
    }
  })

  if (!user) {
    res.status(401).json({
      code: 'VALIDATION_ERROR',
      message: 'Invalid credentionals'
    })
  }

  const isPasswordValid = await bcrypt.compare(user.password_hash, password)
  if (!isPasswordValid) {
    return res.status(401).json({
      code: 'VALIDATION_ERROR',
      message: 'Invalid credentionals'
    })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'JWT_SERCRET_KEY', { expiresIn: '1d' })
  return res.status(200).json({ token })
}

/* MIDDLEWARES */
export function checkAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, 'JWT_SERCRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
