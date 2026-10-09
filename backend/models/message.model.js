const mongoose=require('mongoose')


const messageSchema=new mongoose.Schema({
    message:String,
    user:String
},{versionKey:false,timestamps:true})


const messageModel=mongoose.model('Message',messageSchema)

module.exports=messageModel