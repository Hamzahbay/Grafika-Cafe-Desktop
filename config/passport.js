// import LocalStrategy from 'passport-local'
// import { Actor } from "../models/Actor.js"
const LocalStrategy = require('passport-local')
const Actor = require("../models/Actor.js")

// const psp = passport => {
//     passport.use(new LocalStrategy.Strategy({ usernameField: 'username' }, (username, password, done) => {
//         Actor.findOne({ where: { username } }).then(res => {
//             if (res) {
//                 if (res.toJSON().password == password) {
//                     return done(null, res.toJSON())
//                 } else {
//                     return done(null, false, { message: 'Password Salah!' })
//                 }
//             } else {
//                 return done(null, false, { message: 'Anda Tidak terdaftar!' })
//             }
//         }).catch(err => console.log(err))
//     }))

//     passport.serializeUser((user, done) => {
//         console.log(user)
//         done(null, user.id)
//     })

//     passport.deserializeUser((id, done) => {
//         Actor.findOne({ where: { id } }).then(res => {
//             if (res) {
//                 return done(null, res.toJSON())
//             } else {
//                 return done(null, false)
//             }
//         }).catch(err => console.log(err))
//     })
// }

// export default psp

module.exports = passport => {
    passport.use(new LocalStrategy.Strategy({ usernameField: 'username' }, (username, password, done) => {
        Actor.findOne({ where: { username } }).then(res => {
            if (res) {
                if (res.toJSON().password == password) {
                    return done(null, res.toJSON())
                } else {
                    return done(null, false, { message: 'Password Salah!' })
                }
            } else {
                return done(null, false, { message: 'Anda Tidak terdaftar!' })
            }
        }).catch(err => console.log(err))
    }))

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Actor.findOne({ where: { id } }).then(res => {
            if (res) {
                return done(null, res.toJSON())
            } else {
                return done(null, false)
            }
        }).catch(err => console.log(err))
    })
}