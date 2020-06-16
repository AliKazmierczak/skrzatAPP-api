const mongoose = require('mongoose');

let Tip = mongoose.model("Tip", new mongoose.Schema({
    type: {
        type: String,
        enum: ["general", "specific"],
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            "watering", 
            "pests", 
            "neighboring plants", 
            "planting", 
            "composting",
            "other"
        ]
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    }
}));

module.exports = Tip;