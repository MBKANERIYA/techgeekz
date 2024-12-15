require("dotenv").config()
let http = require("http")
let express = require("express")
let bodyParser = require("body-parser")
const cron = require('node-cron');
const cors = require("cors")
const { dbConnect } = require("./config/dbConnect")
const routes = require("./routes")
const { getGoldPrice } = require("./goldApi/goldPriceLive")

let app = express()
app.use(bodyParser.json())



// function run at 12 AM every day
cron.schedule('0 0 * * *', () => {
    getGoldPrice();
});

dbConnect()
app.use(cors({
    origin: "*"
}))
app.use("/v1", routes)

http.createServer(app).listen(process.env.PORT, () => {
    console.log(`SERVER STARTED ON ${process.env.PORT}`);
})