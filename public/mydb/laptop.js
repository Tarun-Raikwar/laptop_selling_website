const mongoose = require("mongoose");

const laptop_schema = new mongoose.Schema({
    link: {
        type: String,
        unique: true
    },
    length: Number,
    overview: String,
    detail: {
        type: String,
        unique: true
    },
    price: Number,
    series: String,
    brand: String,
    cpu: String,
    color: String,
    about: String,
    graphic_card: String
})


const laptops = mongoose.model("laptops", laptop_schema);

module.export = laptops;