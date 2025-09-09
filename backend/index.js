import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { checkAuthMiddleware } from './controllers/AuthController.js'
import { AuthRouter } from './routers/AuthRouter.js'

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

/* ########################## */
/* #        Роутинг         # */
/* ########################## */
app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'ok' })
})

app.get('/', checkAuthMiddleware, (req, res) => {
  res.send('<h1>In Development</h1>')
})

app.use('/auth', AuthRouter)

app.listen(5050, (err) => {
  if (err) {
    console.error('Server start failed! ', err)
  } else {
    console.log('Server started')
    console.log('http://localhost:5050')
  }
})
