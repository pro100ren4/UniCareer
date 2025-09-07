import { hash } from 'bcryptjs'

import db from '../models/index.js'

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

  const user = db['User'].findOne({ where: { email: email } })
  if (user) {
    res.status(409).json({
      code: 'VALIDATION_ERROR',
      message: 'Dublicate',
      details: {
        field: 'email',
        issue: 'already exist'
      }
    })
  }

  const password_hash = await hash(password, 10)

  db['User'].create({
    email,
    password_hash,
    role,
    is_active: true
  })

  res.status(201).json({ message: 'Пользователь создан' })
}

export function loginUser(req, res) {
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

  const user = db['User'].findOne({
    where: {
      email: email
    }
  })

  if (!user) {
    res.status(404).json({
      code: ''
    })
  }
}
