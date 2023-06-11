// import passport from 'passport'
// import { Actor } from "../models/Actor.js"
const passport = require('passport')
const Actor = require("../models/Actor.js")
const Log = require("../models/Log.js")
const Menu = require("../models/Menu.js")
const Transaction = require("../models/Transaction.js")

class Controller {
    constructor() {
        this.get = {
            login: (request, response) => {
                response.render('main/login/index', { page: 'Login' })
            }, 
            logout: (request, response) => {
                request.logOut()
                request.flash('success_message', `Berhasil Keluar Akun`)
                return response.redirect('/log/in')
            }
        },
            this.post = {
                login: (request, response, next) => {
                    Actor.findOne({ where: { username: request.body.username } }).then(res => {
                        if( res ) {
                            if ( res.toJSON().username == request.body.username ) {
                                if ( res.toJSON().password == request.body.password ) {
                                    passport.authenticate('local', {
                                        successRedirect: '/cashier',
                                        failureRedirect: `/log/in`,
                                        failureFlash: true
                                    })(request, response, next)
                                } else {
                                    request.flash('error_message', 'Password Tidak Sesuai!')
                                    return response.redirect('/log/in')
                                }
                            } else {
                                request.flash('error_message', 'Anda Tidak Terdaftar!')
                                return response.redirect('/log/in')
                            }
                        } else {
                            request.flash('error_message', 'Anda Tidak Terdaftar!')
                            return response.redirect('/log/in')
                        }
                    }).catch(err => console.log(err))
                }
            }
    }
}

// export { Controller as Account }
module.exports = Controller