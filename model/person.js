const mongoose = require("mongoose");
const joi = require("joi");

const personSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    first_name:{
        type: String,
        required: true, 
    },
    last_name:{
        type: String, 
        required:true,
    }
});

const joiPerson = joi.object({
    first_name: joi.string().max(256).min(4).required(),
    last_name: joi.string().max(256).min(4).required(),
    _id: joi.any(), 
})


personSchema.pre("save", function(next){
    const {error} = joiPerson.validate(this._doc);
    if(error) throw error; 
    next();
})

module.exports = mongoose.model("person", personSchema);