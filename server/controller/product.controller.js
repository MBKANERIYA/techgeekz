const { productServices } = require("../services")

module.exports.productCreate = async (req, res) => {
    try {
        let body = req.body
        let product = await productServices.productCreate(body)
        res.status(201).json({
            message: "PRODUCT CREATED SUCCESSFULLY",
            product
        })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

module.exports.findAllProduct = async (req, res) => {
    try {
        let product = await productServices.productGet()
        res.status(200).json({
            message: "PRODUCT CREATED SUCCESSFULLY",
            product
        })
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}
