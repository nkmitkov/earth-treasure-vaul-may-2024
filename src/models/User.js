const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "All fields are required!"],
        minLength: [10, "Email must be at least 10 characters!"],
        match: [/^\w+@\w+\.\w+/, "Invalid Email address!"],
    },
    password: {
        type: String,
        required: [true, "All fields are required!"],
        minLength: [4, "Password must be at least 4 characters!"],
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;