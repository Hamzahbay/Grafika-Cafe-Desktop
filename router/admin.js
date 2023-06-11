// import { Router } from "express"
const Router = require("express")
// import { Admin } from "../controller/admin.js"
const Admin = require("../controller/admin.js")
// import { authentication } from "../config/auth.js"
const { authentication } = require("../config/auth.js")
const router = Router()
const Controller = new Admin()

// Page handle
router.get('/', authentication, Controller.get.index)
router.get('/log', authentication, Controller.get.log)

// Post handle
router.post('/', authentication, Controller.post.index)

// Export router
// export { router as admin }
module.exports = router