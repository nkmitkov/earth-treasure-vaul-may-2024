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

router.get("/dashboard", async (req, res) => {
    try {
        const stones = await stoneService.getAllStones().lean();
        
        res.render("home/dashboard", { stones });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/dashboard", { stones, error: message });
    }
});

router.get("/search", (req, res) => {
    res.render("home/search");
});

module.exports = router;