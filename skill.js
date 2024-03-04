const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const contactSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    lvl:{
        type:String,
        required:true
    },
    clr:
    {
        type:String,
        required:true
    }

},{timestamps:true});
const Skill=mongoose.model('Skill',contactSchema);
module.exports = Skill;

