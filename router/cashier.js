// import { Router } from "express"
const Router = require("express")
// import { Cashier } from "../controller/cashier.js"
const Cashier = require("../controller/cashier.js")
// import { authentication } from "../config/auth.js"
const { authentication } = require("../config/auth.js")
const router = Router()
const Controller = new Cashier()

// Page handle
router.get('/', authentication, Controller.get.index)

// Post handle
router.post('/', authentication, Controller.post.index)

// Export router
// export { router as cashier }
module.exports = router