const mongoose = require("mongoose");
require("dotenv").config()

run()
async function run(){
    await mongoose.connect(process.env.MONGODB_URI)
}
