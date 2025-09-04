const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()


// Начальная конфигурация

// HTTP загловки для безопасности
app.use(helmet())
// Логирование запросов к backend
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("<h1>In Development</h1>")
})

app.listen(5050, (err) => {
    if (err) {
        console.error("Server start failed! ", err);
    } else {
        console.log("Server started")
        console.log("http://localhost:5050")
    }
})