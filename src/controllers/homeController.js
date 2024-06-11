const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("home/home");
});

router.get("/dashboard", (req, res) => {
    res.render("home/dashboard");
});

router.get("/search", (req, res) => {
    res.render("home/search");
});

module.exports = router;