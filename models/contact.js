const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const contactSchema= new Schema({
    subject:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    comment:
    {
        type:String,
        required:true
    }

},{timestamps:true});
const Blog=mongoose.model('Blog',contactSchema);
module.exports = Blog;

