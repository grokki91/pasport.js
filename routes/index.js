const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../User')
const { users } = require('../db')

router.get('/api/user/login', (req, res) => {
    res.render('index', {
        title: 'Authorization'
    })
})

router.get('/api/user/me', 
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/api/user/login')
        }
        next()
    },
    (req, res) => {
        res.render('login', {
            title: `Hello, ${req.user.email}!`,
        })
})

router.get('/api/user/signup', (req, res) => {
    res.render('signup', {
        title: 'Registration'
    })
})

router.post('/api/user/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.redirect('/api/user/login')
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err)
            }
            return res.redirect('/api/user/me')
        })
    })(req, res, next)
})

router.post('/api/user/signup',(req, res, next) => {
    let {email, password} = req.body
    const emailMatches = users.find(user => user.email === email)

    if (!emailMatches) {
        const newUser = new User(email, password)
        users.push(newUser)
        res.redirect('/api/user/me')
    }
    res.redirect('/api/user/signup')
})

module.exports = router