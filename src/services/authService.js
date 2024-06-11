const User = require("../models/User");
const jwt = require("../lib/jwt");

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