const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { users } = require('./db')

const options = {
    usernameField: 'email'
}

const verify = (email, password, done) => {
    return users.filter(user => {
        if (email === user.email && password === user.password) {
            return(null, user)
        } else {
            return done(null, false)
        }
    })
}

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    const user = userDB.id === id ? userDB : false
    cb(null, user)
})

passport.use('local', new LocalStrategy(options, verify))