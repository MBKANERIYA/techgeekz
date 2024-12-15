const { productSchema } = require("../models")

module.exports.productCreate = (body) => {
    return productSchema.create(body)
}

module.exports.productGet = () => {
    return productSchema.find()
}

module.exports.updateProduct = (id, body) => {
    return productSchema.findByIdAndUpdate(id, body, { new: true })
}