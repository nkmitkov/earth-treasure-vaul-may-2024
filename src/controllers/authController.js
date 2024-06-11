const router = require("express").Router();

const authService = require("../services/authService");

router.get("/register", (req, res) => {
    res.render("user/register");
});

router.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);

        res.cookie("auth", token);

        res.redirect("/");
    } catch (error) {
        const message = "get the message";
        console.log(error);
        res.render("user/register", { error: message });
    }
});

router.get("/login", (req, res) => {
    res.render("user/login");
});

module.exports = router;