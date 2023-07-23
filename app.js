const express = require('express')
const app = express()
const routes = require('./routes')
const passport = require('passport')
const session = require('express-session')
require('./config-passport')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
})