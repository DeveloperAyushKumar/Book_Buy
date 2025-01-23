import mongoose from "mongoose"

const bookSchema =new mongoose.Schema({
    //fields 
    title :{
        type:String,
        required:true,

    },
    description :{
        type:String,
        required:true,

    }, 
    category :{
        type:String,
        required:true,

    }, 
    trending :{
        type:Boolean,
        required:true,

    }, 
    oldPrice :{
        type:Number,
        required:true,

    }, 
    newPrice :{
        type:Number,
        required:true,

    },
    createdAt :{
        type :Date,
        default:Date.now
    }

}, 
{timestamps:true}

)
// creating model
const Book =mongoose.model('Book',bookSchema)
// module.exports=Book;
export default Book


