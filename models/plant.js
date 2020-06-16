const mongoose = require('mongoose');

let Plant = mongoose.model("Plant", new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    category: {
        type: [String],
        required: true,
        enum: [
            "fruit", 
            "vegetable", 
            "tree", 
            "bush", 
            "herb", 
            "mushroom", 
            "grain"
        ]
    },
    image: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }, 
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 2500
    },
    earlyestPlantingDate: {
        type: Date,
        required: true
        },
    latestPlantingDate :{
        type: Date,
        required: true
    },
    minimumDaysToHarvest: {
        type: Number,
        min: 1,
        max: 1000
    },
    stageSeed: {
        type: Number,
        min: 1,
        max: 1000
    },
    stageSprout: {
        type: Number,
        min: 1,
        max: 1000
    },
    stageGrowth: {
        type: Number,
        min: 1,
        max: 1000
    },
    plantSeed: {
        type: Boolean,
        required: true,
        default: true
    }
}));

module.exports = Plant
