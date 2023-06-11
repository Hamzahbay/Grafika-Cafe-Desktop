// import { Actor } from "../models/Actor.js"
// import { Log } from "../models/Log.js"
// import { Menu } from "../models/Menu.js"
// import { Tbl } from "../models/Tbl.js"
const Actor = require("../models/Actor.js")
const Log = require("../models/Log.js")
const Menu = require("../models/Menu.js")
const Tbl = require("../models/Tbl.js")
const fs = require("fs")

class Controller {
    constructor() {
        this.get = {
            index: (request, response) => {
                Actor.findOne({ where: { id: request.user.id } }).then(res => {
                    if (res.toJSON().role == 'admin') {
                        response.redirect('/admin')
                    } else if (res.toJSON().role == 'manager') {
                        Menu.findAll().then(res => {
                            Tbl.findAll().then(res1 => {
                                response.render('main/manager/index', { page: 'Manager', data: { menu: res, tbl: res1 } })
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    } else {
                        response.redirect('/cashier')
                    }
                }).catch(err => console.log(err))
            }
        }
        this.post = {
            index: (request, response) => {
                if( typeof request.query.table != 'undefined' ) {
                    if (request.query.action == 'add') {
                        Tbl.findAll().then(res => {
                            let id = 0
                            let number = 1
                            if (res.length != 0) id = res[res.length - 1].id + 1
                            if (res.length != 0) number = parseInt(res.length) + 1
                            Tbl.create({
                                id, number, status: 'available',
                                date: new Date().toLocaleString(),
                                actor_id: request.user.id
                            }).then(res1 => {
                                if (res1) {
                                    Log.findAll().then(res2 => {
                                        let log_id = 0
                                        if (res2.length != 0) log_id = res2[res2.length - 1].id + 1
    
                                        Log.create({
                                            id: log_id,
                                            actor_id: request.user.id,
                                            message: ["create", "table"],
                                            date: new Date().toLocaleString(),
                                            target_id: id
                                        }).then(res1 => {
                                            if (res1) {
                                                request.flash('success_message', 'Data tersimpan!')
                                                return response.redirect('/manager')
                                            } else {
                                                request.flash('error_message', 'Terjadi Kesalahan!')
                                                return response.redirect('/manager')
                                            }
                                        }).catch(err => console.log(err))
                                    }).catch(err => console.log(err))
                                } else {
                                    request.flash('error_message', 'Terjadi Kesalahan!')
                                    return response.redirect('/manager')
                                }
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }
                    if (request.query.action == 'del') {
                        Tbl.findAll().then(res => {
                            Tbl.destroy({ where: { id: res[res.length - 1].id } }).then(res1 => {
                                if (res1) {
                                    Log.findAll().then(res2 => {
                                        let log_id = 0
                                        if (res2.length != 0) log_id = res2[res2.length - 1].id + 1
    
                                        Log.create({
                                            id: log_id,
                                            actor_id: request.user.id,
                                            message: ["delete", "table"],
                                            date: new Date().toLocaleString(),
                                            target_id: res[res.length - 1].id
                                        }).then(res1 => {
                                            if (res1) {
                                                request.flash('success_message', 'Data telah dihapus!')
                                                return response.redirect('/manager')
                                            } else {
                                                request.flash('error_message', 'Terjadi Kesalahan!')
                                                return response.redirect('/manager')
                                            }
                                        }).catch(err => console.log(err))
                                    }).catch(err => console.log(err))
                                } else {
                                    request.flash('error_message', 'Terjadi Kesalahan!')
                                    return response.redirect('/manager')
                                }
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }
                } else {
                    if (request.query.action == 'add') {
                        let pic = null
                        let pic_id = 0

                        if( request.body.pic != '' ) {
                            pic = fs.readFileSync(request.body.pic)
                            pic_id = request.body.price
                        }
    
                        Menu.findAll().then(res => {
                            let id = 0
                            if (res.length != 0) id = res[res.length - 1].id + 1
    
                            let fnl_pic_id = 0
                            if( pic_id != 0 ) fnl_pic_id = `${pic_id - Math.floor(Math.random() * 999999)}${id}`
                            Menu.create({
                                id,
                                name: request.body.name,
                                price: parseInt(request.body.price),
                                date: new Date().toLocaleString(),
                                actor_id: request.user.id,
                                pic_id: fnl_pic_id
                            }).then(res0 => {
                                if (res0) {
                                    Log.findAll().then(res2 => {
                                        let log_id = 0
                                        if (res2.length != 0) log_id = res2[res2.length - 1].id + 1
    
                                        Log.create({
                                            id: log_id,
                                            actor_id: request.user.id,
                                            message: ["create", "menu"],
                                            date: new Date().toLocaleString(),
                                            target_id: id
                                        }).then(res1 => {
                                            if ( res1 ) {
                                                fs.readdir('./public/data', (err, folder) => {
                                                    if( err ) {
                                                        fs.mkdirSync('./public/data', { recursive: true })
                                                    }
                                                    fs.readdir('./public/data/pic-menu', (err, folder) => {
                                                        if( err ) fs.mkdirSync('./public/data/pic-menu', { recursive: true })
                                                        if( fs.readdirSync('./public/data/pic-menu/').indexOf('0.png') < 0 ) {
                                                            fs.writeFileSync('./public/data/pic-menu/0.png', fs.readFileSync('./others/soda.png'))
                                                        }
                                                        if( pic != null ) fs.writeFileSync(`./public/data/pic-menu/${fnl_pic_id}.png`, pic)
                                                        request.flash('success_message', 'Data tersimpan!')
                                                        return response.redirect('/manager')
                                                    })
                                                })
                                            } else {
                                                request.flash('error_message', 'Terjadi Kesalahan!')
                                                return response.redirect('/manager')
                                            }
                                        }).catch(err => console.log(err))
                                    }).catch(err => console.log(err))
                                } else {
                                    request.flash('error_message', 'Terjadi Kesalahan!')
                                    return response.redirect('/manager')
                                }
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }
                    if (request.query.action == 'edit') {
                        let pic = null
                        let pic_id = request.query.pic

                        if( request.body.pic != '' ) {
                            pic = fs.readFileSync(request.body.pic)
                            // pic_id = `${pic_id - Math.floor(Math.random() * 999999)}${request.query.id}`

                            fs.writeFileSync(`./public/data/pic-menu/${pic_id}.png`, pic)
                        }

                        Menu.update({
                            name: request.body.name,
                            price: parseInt(request.body.price),
                            pic_id
                        }, { where: { id: request.query.id } }).then(res => {
                            if (res) {
                                Log.findAll().then(res2 => {
                                    let log_id = 0
                                    if (res2.length != 0) log_id = res2[res2.length - 1].id + 1
    
                                    Log.create({
                                        id: log_id,
                                        actor_id: request.user.id,
                                        message: ["update", "menu"],
                                        date: new Date().toLocaleString(),
                                        target_id: request.query.id
                                    }).then(res1 => {
                                        if (res1) {
                                            request.flash('success_message', 'Data tersimpan!')
                                            return response.redirect('/manager')
                                        } else {
                                            request.flash('error_message', 'Terjadi Kesalahan!')
                                            return response.redirect('/manager')
                                        }
                                    }).catch(err => console.log(err))
                                }).catch(err => console.log(err))
                            } else {
                                request.flash('error_message', 'Terjadi Kesalahan!')
                                return response.redirect('/manager')
                            }
                        }).catch(err => console.log(err))
                    }
                    if (request.query.action == 'del') {
                        Menu.destroy({ where: { id: request.body.id } }).then(res => {
                            if ( res ) {
                                if( request.query.pic != 0 ) fs.unlinkSync(`./public/data/pic-menu/${request.query.pic}.png`)
                                Log.findAll().then(res2 => {
                                    let log_id = 0
                                    if (res2.length != 0) log_id = res2[res2.length - 1].id + 1
    
                                    Log.create({
                                        id: log_id,
                                        actor_id: request.user.id,
                                        message: ["delete", "menu"],
                                        date: new Date().toLocaleString(),
                                        target_id: request.body.id
                                    }).then(res1 => {
                                        if (res1) {
                                            request.flash('success_message', 'Data telah terhapus!')
                                            return response.redirect('/manager')
                                        } else {
                                            request.flash('error_message', 'Terjadi Kesalahan!')
                                            return response.redirect('/manager')
                                        }
                                    }).catch(err => console.log(err))
                                }).catch(err => console.log(err))
                            } else {
                                request.flash('error_message', 'Terjadi Kesalahan!')
                                return response.redirect('/manager')
                            }
                        }).catch(err => console.log(err))
                    }
                }
            }
        }
    }
}

// export { Controller as Manager }
module.exports = Controller