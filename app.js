// Package
// import { BrowserWindow } from 'electron'
// import express, { urlencoded, json } from 'express'
// import expressLayouts from 'express-ejs-layouts'
// import session from 'express-session'
// import flash from 'connect-flash'
// import passport from 'passport'

const Electron = require('electron')
const express = require('express')
const { urlencoded, json } = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// 

// Variable
const app = express()
const port = 1200

// Directory path
// import { fileURLToPath } from 'url'
// import { join, dirname } from 'path'
// const { join, dirname } = require('path')
// const { fileURLToPath } = require('url')
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// 
//Electron Dev
const isDev = require('electron-is-dev')

//Disabling Hardware Acceleration
// Electron.app.disableHardwareAcceleration()

// Create Desktop Engine
let Stage = null
const window = (url, size, set) => {
    Stage = new Electron.BrowserWindow({
        width: size.width.normal, height: size.height.normal,
        autoHideMenuBar: true,
        minWidth: size.width.min, minHeight: size.height.min,
        icon: './others/java1.png'
    })

    //Load Server URL
    const winUrl = url.link
    Stage.loadURL(winUrl)

    //Open Electron Desktop
    Stage.on('ready-to-show', () => {
        Stage.show()
        Stage.maximize(set.maximize)
        Stage.setFullScreen(set.fullScreen)
    })
}

// Passport authorization
// import psp from './config/passport.js'
// psp(passport)
require('./config/passport.js')(passport)

// Cookies/Session
app.use(session({
    secret: 'MartinGarrix',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash message
app.use(flash())

// Global variable // Flash message
app.use((request, response, next) => {
    response.locals.success_message = request.flash('success_message')
    response.locals.error_message = request.flash('error_message')
    response.locals.warning_message = request.flash('warning_message')
    response.locals.error = request.flash('error')
    next()
})

// View engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Body parser
app.use(urlencoded({ extended: false }))
app.use(json())

// Public file
// app.use(express.static(join(__dirname, 'public')))
app.use(require('express').static('public'))

// // Routes
// // Login
// import { login } from './router/account.js'
// app.use('/log', login)
// // Admin
// import { admin } from './router/admin.js'
// app.use('/admin', admin)
// // Cashier
// import { cashier } from './router/cashier.js'
// app.use('/cashier', cashier)
// // Manager
// import { manager } from './router/manager.js'
// app.use('/manager', manager)

// Routes
// Login
const login = require('./router/account.js')
app.use('/log', login)
// Admin
const admin = require('./router/admin.js')
app.use('/admin', admin)
// Cashier
const cashier = require('./router/cashier.js')
app.use('/cashier', cashier)
// Manager
const manager = require('./router/manager.js')
app.use('/manager', manager)

// 

// Run Server
app.listen(port, console.log(`Server listening at port ${port}`))

// Build Desktop
// Electron.app.whenReady().then(res => {
//     createWindows()
// }).catch(err => console.log(err))
Electron.app.whenReady().then(() => window({ link: `http://localhost:${port}/log/in`, dir: './views/main/landingPage/index.html' }, { width: { normal: 1000, min: 900 }, height: { normal: 600, min: 500 } }, { maximize: true, fullScreen: false })).then(() => console.log('Success Create Application!')).catch(err => console.log(err))
Electron.app.on('window-all-closed', () => {
    Stage = null
    if (process.platform != 'darwin') Electron.app.quit()
})