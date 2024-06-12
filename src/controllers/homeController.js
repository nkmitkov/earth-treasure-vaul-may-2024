const router = require("express").Router();

const stoneService = require("../services/stoneService");

router.get("/", async (req, res) => {
    try {
        const stones = await stoneService.getAllStones().lean();
        
        res.render("home/home", { stones });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/home", { stones, error: message });
    }
});

router.get("/dashboard", (req, res) => {
    res.render("home/dashboard");
});

router.get("/search", (req, res) => {
    res.render("home/search");
});

module.exports = router;