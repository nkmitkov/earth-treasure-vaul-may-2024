const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [2, "Name must be at least 2 characters"],
        lowercase: true,
    },
    category: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [3, "Category must be at least 3 characters"],
    },
    color: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [2, "Color must be at least 2 characters"],
    },
    formula: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [3, "Formula must be between 3 and 30 characters"],
        maxLength: [30, "Formula must be between 3 and 30 characters"],
    },
    location: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [5, "Location must be between 5 and 15 characters"],
        maxLength: [15, "Location must be between 5 and 15 characters"],
    },
    description: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [10, "Description must be at least 10 characters"],
    },
    image: {
        type: String,
        required: [true, "All fields are required"],
        match: [/^https?:\/\//, "Image must be a valid url"],
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

const Stone = mongoose.model("Stone", stoneSchema);

module.exports = Stone;