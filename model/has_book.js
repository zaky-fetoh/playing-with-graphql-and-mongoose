const mongoose = require("mongoose");
const joi = require("joi");

const hasBookSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    book_id: {
        type: Number,
        required: true, ref: "book",
    },
    person_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, ref: "person",
    },
    from: {
        type: Date,
        default: Date.now,
    },
    to: {
        type: Date,
        default: () => new Date().setDate(new Date().getDate() + 30),
    },
})

const joiHasBook = joi.object({
    _id: joi.any(),
    book_id: joi.any().required(),
    person_id: joi.any().required(),
    from: joi.date().required(),
    to: joi.date().required(),
});


hasBookSchema.pre("save", function (next) {
    const { error } = joiHasBook.validate(this._doc);
    this.person_id = mongoose.Types.ObjectId(this.person_id)
    if (error) throw error;
    const Deadline = new Date(this.from)
    Deadline.setDate(Deadline.getDate() + 30);
    if (this.to <= Deadline) throw new Error("max rent period is 30 days only");
    next()
})

module.exports = mongoose.model("has-book", hasBookSchema);