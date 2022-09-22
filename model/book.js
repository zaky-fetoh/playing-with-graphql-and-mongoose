const mongoose = require("mongoose");
const joi = require("joi");


const bookSchema = mongoose.Schema({
    _id: { 
        type:mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    name:{
        type: String, 
        required: true,
        max: 512,  
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref:"author", 
    },
});


const joiBook = joi.object({
    _id: joi.any(),
    name: joi.string().max(512).min(3).required(),
    author: joi.any().required(),  
})

bookSchema.pre("save", async function(next){
    const {error} = joiBook.validate(this._doc);
    if(error) throw error;
    next()
})

module.exports = mongoose.model("book", bookSchema);