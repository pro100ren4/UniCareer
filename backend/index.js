import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { AuthRouter } from './routers/AuthRouter.js'

const app = express()

/* ########################## */
/* #      Конфигурация      # */
/* ########################## */

// HTTP загловки для безопасности
app.use(helmet())
// Логирование запросов к backend
app.use(morgan('dev'))

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

app.get('/', (req, res) => {
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
