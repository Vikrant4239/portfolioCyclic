const mongoose = require('mongoose')
const connectdb = async () =>{
    try {
        const con = await mongoose.connect(process.env.MURL);
        console.log(`connected to mongodb ${con.connection.host}`)

        
    } catch (error) {
        console.log('error in mongodb')
    }
}
module.exports =connectdb;