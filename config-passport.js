const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { users } = require('./db')

const options = {
    usernameField: 'email'
}

const verify = (email, password, done) => {
    return users.find(user => {
        if (email === user.email && password === user.password) {
            console.log('verify');
            return(null, user)
        } else {
            console.log('not verify');
            return done(null, false)
        }
    })
}

passport.serializeUser((user, cb) => {
    console.log('serializeUser');
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
    console.log('deserializeUser');
    const user = users.find(user => user.id === id)
    cb(null, user)
})

passport.use('local', new LocalStrategy(options, verify))