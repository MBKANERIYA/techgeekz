let express = require("express")
let productRoute = require("./product.route")

let routes = express.Router()

routes.use("/product", productRoute)

module.exports = routes