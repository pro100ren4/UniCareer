import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import db from '../models/index.js'

// TODO: Добавить проверку того, что почта подтверждена для запросов
// которые отправляют письма на почту

// Mailhog - тестовый SMTP сервер, который не отправляет реальные письма и
// используется только чтобы проверить почтовую систему.
const transporter = nodemailer.createTransport({
  host: 'mailhog',
  port: 1025,
  secure: false // Mailhog не требует TLS
})

function genereteAccessToken(user) {
  const accessToken = jwt.sign({ id: user.id, email: user.email }, 'ACCESS_JWT_SECRET_KEY', { expiresIn: '15m' })
  return accessToken
}

async function generateRefreshToken(user) {
  const refreshToken = jwt.sign({ id: user.id, email: user.email }, 'REFRESH_JWT_SECRET_KEY', { expiresIn: '1d' })
  await db['RefreshToken'].create({ user_id: user.id, token: refreshToken })
  return refreshToken
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

  const emailVerificationToken = jwt.sign({ email: user.email }, 'EMAIL_JWT_SERCRET_KEY', { expiresIn: '1d' })
  // FIXME: Исправить URL с API на Frontend
  const emailVerificationUrl = `http://localhost/api/auth/verify-email?token=${emailVerificationToken}`

  await transporter.sendMail({
    from: '"Test App" <noreply@example.com>',
    to: user.email,
    subject: 'Подтверждение почты',
    html: `Для подтверждения почты перейдите по ссылке: <a href="${emailVerificationUrl}">${emailVerificationUrl}</a>`
  })

  const accessToken = genereteAccessToken(user)
  const refreshToken = await generateRefreshToken(user)

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

  // Проверяем не залогинен ли уже пользователь
  let refreshToken = await db['RefreshToken'].findOne({ where: { user_id: user.id } })
  const accessToken = genereteAccessToken(user)

  refreshToken = refreshToken?.token ?? (await generateRefreshToken(user))
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
    return res.status(200).json({ accessToken })
  })
}

export async function logoutUser(req, res) {
  const refreshToken = req.cookies.refreshToken
  jwt.verify(refreshToken, 'REFRESH_JWT_SECRET_KEY', async (err, decoded) => {
    if (err) return res.status(500).send('FUCK TOKEN')

    await db['RefreshToken'].destroy({
      where: {
        user_id: decoded.id
      }
    })

    res.clearCookie('refreshToken')
    return res.sendStatus(204)
  })
}

export function verifyUserMail(req, res) {
  const token = req.query.token

  jwt.verify(token, 'EMAIL_JWT_SERCRET_KEY', async (err, decoded) => {
    if (err) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Token expired'
      })
    }

    const user = await db['User'].findOne({ where: { email: decoded.email } })
    if (!user) {
      return res.sendStatus(400)
    }

    // TODO: Добавить в модель поле is_email_verified
    user.is_email_verified = true
    await user.save()
    return res.sendStatus(200)
  })
}

export async function requestResetPassword(req, res) {
  const { email } = req.body

  const user = await db['User'].findOne({ where: { email: email } })
  if (!user) {
    return res.status(404).json({
      code: 'NOT_FOUND',
      message: 'user not found'
    })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, 'EMAIL_JWT_SERCRET_KEY', { expiresIn: '1d' })
  // FIXME: Исправить URL с API на Frontend
  const resetPassUrl = `http://localhost/api/auth/reset-password?token=${token}`

  await transporter.sendMail({
    from: '"Tst App" <noreply@exameple.com>',
    to: user.email,
    subject: 'Cброс пароля',
    html: `Для сброса пароля перейдите по ссылке: <a href="${resetPassUrl}">${resetPassUrl}</a>`
  })
  return res.sendStatus(200)
}

export function resetUserPassword(req, res) {
  const { token } = req.query
  const { newPassword } = req.body

  jwt.verify(token, 'EMAIL_JWT_SERCRET_KEY', async (err, decoded) => {
    if (err) {
      return res.status(400).json({
        code: 'VALIDATION_ERROR',
        message: 'Bad credentials'
      })
    }

    const password_hash = await bcrypt.hash(newPassword, 10)
    const user = await db['User'].findByPk(decoded.id)
    user.password_hash = password_hash
    await user.save()

    return res.sendStatus(200)
  })
}

/* MIDDLEWARES */
export function checkAuthMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, 'ACCESS_JWT_SECRET_KEY', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}
