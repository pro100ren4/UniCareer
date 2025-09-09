import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import db from '../models/index.js'

/**
 * TODO:
 * - Подтверждение почты
 * - Сброс пороля по почте
 * FIXME:
 * - Исправить логику работы refresh токенов
 */

async function generateTokens(user) {
  const accessToken = jwt.sign({ id: user.id, email: user.email }, 'ACCESS_JWT_SECRET_KEY', { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, 'REFRESH_JWT_SECRET_KEY', { expiresIn: '1d' })
  // XXX: Следует удалить expires_at поле из Модели, потому что эта информация
  // хранится непосредственно в токене
  const date = new Date()
  date.setDate(date.getDate() + 1)
  await db['RefreshToken'].create({ token: refreshToken, expires_at: date.toISOString().split('T')[0] })
  return { accessToken, refreshToken }
}

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

  if (role === 'student') {
    const { fullName } = req.body
    const student = await db['Student'].create({
      user_id: user.id,
      full_name: fullName,
      university: 'None',
      course: 1
    })
  } else if (role === 'company') {
    const { companyName } = req.body
    const company = await db['Company'].create({
      user_id: user.id,
      name: companyName
    })
  }

  const { refreshToken, accessToken } = await generateTokens(user)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // true для HTTPS
    sameSite: 'strict'
  })
  res.status(201).json({ accessToken, refreshToken })
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

  const isPasswordValid = await bcrypt.compare(password, user.password_hash)
  if (!isPasswordValid) {
    return res.status(401).json({
      code: 'VALIDATION_ERROR',
      message: 'Invalid credentionals'
    })
  }

  const { refreshToken, accessToken } = await generateTokens(user)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: false, // true для HTTPS
    sameSite: 'strict'
  })
  res.status(200).json({ accessToken, refreshToken })
}

export async function refreshToken(req, res) {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    res.sendStatus(401)
  }
  const isRefreshTokenValid = await db['RefreshToken'].findOne({ where: { token: refreshToken } })
  if (!isRefreshTokenValid) {
    return res.sendStatus(401)
  }

  jwt.verify(refreshToken, 'REFRESH_JWT_SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(401)

    const accessToken = jwt.sign({ id: user.id, email: user.email }, 'ACCESS_JWT_SECRET_KEY', { expiresIn: '15m' })
    return res.status(204).json({ accessToken })
  })
}

export async function logoutUser(req, res) {
  const refreshToken = req.cookies.refreshToken
  await db['RefreshToken'].destroy({
    where: {
      token: refreshToken
    }
  })
  res.clearCookie('refreshToken')
  res.status(204)
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
