let express = require("express")
const { productController } = require("../controller")

let route = express.Router()

route.post("/create", productController.productCreate)
route.get("/get", productController.findAllProduct)

module.exports = route