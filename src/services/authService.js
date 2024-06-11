const User = require("../models/User");
const jwt = require("../lib/jwt");
const bcrypt = require("bcrypt");

const { SECRET } = require("../config/config");

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error("Email already exists");
    }

    const createdUser = await User.create(userData);

    // Generate jwt token
    const payload = {
        _id: createdUser._id,
        email: createdUser.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    // return token
    return token;
};

exports.login = async (userData) => {
    // Get user from db
    const user = await User.findOne({ email: userData.email });

    // If user doesn't exist throw an error
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Validate that passwords match
    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    // Generate jwt token
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    // return token
    return token;
};