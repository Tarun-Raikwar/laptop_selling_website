const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    PhNo: {
        type: Number,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },     
    pass : {
        type: String,
        required: true
    }
});

const members = mongoose.model("members", membersSchema);

module.export = members;