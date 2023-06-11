// import { Actor } from "../models/Actor.js"
// import { Log } from "../models/Log.js"
// import { Menu } from "../models/Menu.js"
// import { Transaction } from "../models/Transaction.js"
const Actor = require("../models/Actor.js")
const Log = require("../models/Log.js")
const Menu = require("../models/Menu.js")
const Tbl = require("../models/Tbl.js")
const Transaction = require("../models/Transaction.js")

class Controller {
    constructor() {
        this.get = {
            index: (request, response) => {
                Actor.findOne({ where: { id: request.user.id } }).then(res => {
                    if (res.toJSON().role == 'admin') {
                        response.redirect('/admin')
                    } else if (res.toJSON().role == 'manager') {
                        response.redirect('/manager')
                    } else {
                        Menu.findAll().then(res => {
                            Transaction.findAll().then(res0 => {
                                Tbl.findAll().then(res1 => {
                                    let bill = []
                                    res0.forEach(x => {
                                        if( x.toJSON().status == 'bill' ) bill.push({ id: x.toJSON().id, tbl: x.toJSON().tbl_id })
                                    })
                                    response.render('main/cashier/index', { page: 'Cashier', data: { menu: res, transaction: res0, tbl: res1 }, user: request.user, bill })
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))
            }
        }
        this.post = {
            index: (request, response) => {
                let alp = []

                if (typeof request.body.menu == 'string') {
                    alp.push({ menu: request.body.menu, qty: request.body.qty })
                }
                if (typeof request.body.menu == 'object') {
                    let i = 0
                    request.body.menu.forEach(x => {
                        alp.push({ menu: x, qty: request.body.qty[i++] })
                    })
                    alp.shift()
                }

                if( request.query.action == 'add' ) {
                    Transaction.findAll().then(res => {
                        let id = 0
                        if (res.length != 0) id = res[res.length - 1].id + 1
    
                        Transaction.create({
                            id,
                            data: alp,
                            date: new Date().toLocaleString(),
                            actor_id: request.user.id,
                            tbl_id: request.query.tbl,
                            status: 'bill'
                        }).then(res0 => {
                            if (res0) {
                                request.flash('success_message', `Pesanan Meja ${parseInt(request.query.tbl) + 1}!`)
                                response.redirect('/cashier')
                            } else {
                                request.flash('error_messagae', 'Terjadi Kesalahan!')
                                response.redirect('/cashier')
                            }
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                if( request.query.action == 'pay' ) {
                    Transaction.update({
                        data: alp,
                        date: new Date().toLocaleString(),
                        status: 'paid'
                    }, { where: { id: request.query.transaction } }).then(res => {
                        if( res ) {
                            Log.findAll().then(res1 => {
                                let log_id = 0
                                if (res1.length != 0) log_id = res1[res1.length - 1].id + 1

                                Log.create({
                                    id: log_id,
                                    actor_id: request.user.id,
                                    message: ["create", "transaction"],
                                    date: new Date().toLocaleString(),
                                    target_id: request.query.transaction
                                }).then(res2 => {
                                    if (res2) {
                                        request.flash('success_message', 'Transaksi Berhasil!')
                                        response.redirect('/cashier')
                                    } else {
                                        request.flash('error_messagae', 'Terjadi Kesalahan!')
                                        response.redirect('/cashier')
                                    }
                                }).catch(err => console.log(err))
                            }).catch(err => console.log(err))
                        } else {
                            request.flash('error_messagae', 'Terjadi Kesalahan!')
                            response.redirect('/cashier')
                        }
                    }).catch(err => console.log(err))
                }
            }
        }
    }
}

// export { Controller as Cashier }
module.exports = Controller