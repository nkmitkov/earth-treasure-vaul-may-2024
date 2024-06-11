const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "All fields are required!"],
        minLength: [10, "Email must be at least 10 characters"],
        match: [/^\w+@\w+\.\w+/, "Invalid Email address"],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "All fields are required"],
        minLength: [4, "Password must be at least 4 characters"],
    }
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
});

userSchema.virtual("rePassword")
    .set(function (rePassValue) {
        if (rePassValue !== this.password) {
            throw new Error("Both passwords must match");
        }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;