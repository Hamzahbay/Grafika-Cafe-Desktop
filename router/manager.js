// import { Router } from "express"
const Router = require("express")
// import { Manager } from "../controller/manager.js"
const Manager = require("../controller/manager.js")
// import { authentication } from "../config/auth.js"
const { authentication } = require("../config/auth.js")
const router = Router()
const Controller = new Manager()

// Page handle
router.get('/', authentication, Controller.get.index)

// Post handle
router.post('/', authentication, Controller.post.index)

// Export router
// export { router as manager }
module.exports = router