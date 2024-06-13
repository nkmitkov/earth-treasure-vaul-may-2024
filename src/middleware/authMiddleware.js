const jwt = require("../lib/jwt");
const { SECRET } = require("../config/config");

exports.auth = async (req, res, next) => {
    const token = req.cookies["auth"];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    } catch (error) {
        res.clearCookie("auth");
        res.redirect("/login");
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/login");
    }

    next();
};

exports.isNotAuth = (req, res, next) => {
    if (req.user) {
        return res.redirect("/dashboard");
    }

    next();
};