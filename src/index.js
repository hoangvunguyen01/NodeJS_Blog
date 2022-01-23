const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

const route = require('./routes')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// app.use(morgan('combined'))

const exphbs = require('express-handlebars')
const hbs = exphbs.create({ extname: '.hbs' })
// TEMPLATE ENGINE
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'resources/views'))

route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})