import app from './app.js'
import config from './config/app.js'

app.listen(config['port'], (err) => {
  if (err) {
    console.error('Server start failed! ', err)
  } else {
    console.log('Server started')
    console.log('http://localhost:' + config['port'])
  }
})
