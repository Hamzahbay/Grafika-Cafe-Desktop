// import { Router } from "express"
const Router = require("express")
// import { Account } from "../controller/account.js"
const Account = require("../controller/account.js")
const router = Router()
const Controller = new Account()

// Page handle
router.get('/in', Controller.get.login)
router.get('/out', Controller.get.logout)

// Post handle
router.post('/in', Controller.post.login)

// Export router
// export { router as login }
module.exports = router