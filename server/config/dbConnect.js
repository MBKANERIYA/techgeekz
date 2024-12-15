let mongoose = require("mongoose")

module.exports.dbConnect = async () => {
    await mongoose.connect(process.env.DB_URL)
    console.log(`SERVER CONNECT WITH ${process.env.DB_URL}`);
}