const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/MPSERVICES");

const laptop_schema = new mongoose.Schema({
    link: String,
    model: String,
    price: Number
})

// console.log("i am in upload");

const laptops = mongoose.model("laptops", laptop_schema);

laptops.find(function(err, All_laptops){
    if(err){
        console.log(err);
    }
    else{
        console.log(All_laptops);
    }
})