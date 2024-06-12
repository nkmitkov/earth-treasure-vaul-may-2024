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

    const payload = {
        _id: createdUser._id,
        email: createdUser.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
};

exports.login = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isValid = await bcrypt.compare(userData.password, user.password);

    if (!isValid) {
        throw new Error("Invalid email or password");
    }

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
};