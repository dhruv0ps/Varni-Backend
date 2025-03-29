const mongoose = require("mongoose")

// const db_dev = "mongodb+srv://mtduser001:jYkAN8uB0xCFF4dz@cluster0.fwesurt.mongodb.net/mtdRBAC?retryWrites=true&w=majority&appName=Cluster0"
//  
const db_dev = process.env.MONGO_URL || "mongodb://localhost:27017/Switch"
mongoose.connect(db_dev)
// mongoose.connect('mongodb://localhost:27017/mtd-prod4?replicaSet=rs0')
let db = mongoose.connection

db.on('error', console.error.bind(console, "[[[Database connection error]]]"))
db.once('open',()=>{
    console.log("[[ Database Connected Successfully ]]")
})


module.exports = db