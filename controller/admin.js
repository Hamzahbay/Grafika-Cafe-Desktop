// import { Sequelize } from "sequelize"
// import { Actor } from "../models/Actor.js"
// import { Log } from "../models/Log.js"
const Actor = require("../models/Actor.js")
const Log = require("../models/Log.js")
const Menu = require("../models/Menu.js")
const Transaction = require("../models/Transaction.js")

class Controller {
    constructor() {
        this.get = {
            index: (request, response) => {
                Actor.findOne({ where: { id: request.user.id } }).then(res => {
                    if (res.toJSON().role == 'admin') {
                        Actor.findAll().then(res => {
                            response.render('main/admin/index', { page: 'User Control', actor: request.user, data: res })
                        }).catch(err => console.log(err))
                    } else {
                        response.redirect('/error')
                    }
                }).catch(err => console.log(err))
            },
            log: (request, response) => {
                Actor.findOne({ where: { id: request.user.id } }).then(res => {
                    if (res.toJSON().role == 'admin') {
                        Log.findAll().then(res1 => {
                            Actor.findAll().then(res => {
                                response.render('main/admin/log', { page: 'User Control', actor: request.user, data: { actor: res, log: res1 } })
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    } else {
                        response.redirect('/error')
                    }
                }).catch(err => console.log(err))
            }
        }
        this.post = {
            index: (request, response) => {
                if (request.query.action == 'add') {
                    Actor.findAll().then(res => {
                        Actor.findOne({ where: { username: request.body.username } }).then(res1 => {
                            if (res1) {
                                request.flash('error_message', 'Username Telah Digunakan!')
                                return response.redirect('/admin')
                            } else {
                                let date = new Date().toLocaleString()
                                Actor.create({ id: res[res.length - 1].id + 1, username: request.body.username, password: request.body.password, role: request.body.role, date }).then(res0 => {
                                    if (res0) {
                                        request.flash('success_message', 'Data tersimpan!')
                                        return response.redirect('/admin')
                                    } else {
                                        request.flash('error_message', 'Terjadi Kesalahan!')
                                        return response.redirect('/admin')
                                    }
                                }).catch(err => console.log(err))
                            }
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                if (request.query.action == 'del') {
                    Actor.destroy({ where: { id: request.query.id } }).then(res => {
                        if (res) {
                            request.flash('success_message', 'Data Berhasil Dihapus!')
                            return response.redirect('/admin')
                        } else {
                            request.flash('error_message', 'Terjadi Kesalahan!')
                            return response.redirect('/admin')
                        }
                    }).catch(err => console.log(err))
                }
                if (request.query.action == 'edit') {
                    Actor.update({ username: request.body.username, password: request.body.password, role: request.body.role }, { where: { id: request.query.id } }).then(res => {
                        if (res) {
                            request.flash('success_message', 'Data Berhasil Diedit!')
                            return response.redirect('/admin')
                        } else {
                            request.flash('error_message', 'Terjadi Kesalahan!')
                            return response.redirect('/admin')
                        }
                    }).catch(err => console.log(err))
                }
            }
        }
    }
}

// export { Controller as Admin }
module.exports = Controller