const router = require("express").Router();

const authService = require("../services/authService");
const { getErrorMessage } = require("../utils/errorUtils");
const { isAuth, isNotAuth } = require("../middleware/authMiddleware");

router.get("/register", isNotAuth, (req, res) => {
    res.render("user/register");
});

router.post("/register", isNotAuth, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie("auth", token);

        res.redirect("/");
    } catch (error) {
        const message = getErrorMessage(error);

        res.render("user/register", { email: userData.email, error: message });
    }
});

router.get("/login", isNotAuth, (req, res) => {
    res.render("user/login");
});

router.post("/login", isNotAuth, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.login(userData);

        res.cookie("auth", token);

        res.redirect("/");
    } catch (error) {
        const message = getErrorMessage(error);

        res.render("user/login", { email: userData.email, error: message });
    }
});

router.get("/logout", isAuth, (req, res) => {
    res.clearCookie("auth");

    res.redirect("/");
});

module.exports = router;