const mongoose = require("mongoose");
const joi = require("joi");



const authorSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    first_name: {
        type: String, 
        requied: true,
    },
    last_name:{
        type: String, 
        required: true,
    }
});

const joiAuthor = joi.object({
    _id: any(),
    first_name: joi.string().max(265),
    last_name: joi.string
})