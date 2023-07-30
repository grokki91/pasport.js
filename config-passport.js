const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { users } = require('./db')

const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}

const verify = (email, password, done) => {
    const user = users.find(user => email === user.email)
    if (!user) {
        return done(null, false)
    }
    if (password !== user.password) {
        return done(null, false)
    }
    return done(null, user)
}

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    const user = users.find(user => user.id === id)
    cb(null, user)
})

passport.use('local', new LocalStrategy(options, verify))