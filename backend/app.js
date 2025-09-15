import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { checkAuthMiddleware } from './controllers/AuthController.js'
import { AuthRouter } from './routers/AuthRouter.js'
import db from './models/index.js'

const app = express()

/* ########################## */
/* #      Конфигурация      # */
/* ########################## */

// HTTP загловки для безопасности
app.use(helmet())
// Логирование запросов к backend
app.use(morgan('dev'))
// Работа с Coockie
app.use(cookieParser())
// Разрешаем CORS для фронтенда
app.use(
  cors({
    origin: 'http://localhost',
    credentials: true
  })
)
// Доступ к body как к js объкту
app.use(bodyParser.json())
// Центральный обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal server error')
})

/* ########################## */
/* #        Роутинг         # */
/* ########################## */
app.get('/health', async (req, res) => {
  await db['User'].findByPk(1)
  return res.status(200).json({ status: 'ok' })
})

app.get('/', checkAuthMiddleware, (req, res) => {
  res.send('<h1>In Development</h1>')
})

app.use('/auth', AuthRouter)

export default app