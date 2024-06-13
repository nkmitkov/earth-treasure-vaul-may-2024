const router = require("express").Router();

const stoneService = require("../services/stoneService");
const { getErrorMessage } = require("../utils/errorUtils");
const lowerToCapital = require("../utils/lowerToCapital");

router.get("/", async (req, res) => {
    try {
        let stones = await stoneService.getAllStones().lean();

        stones = lowerToCapital(stones);

        res.render("home/home", { stones });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/home", { stones, error: message });
    }
});

router.get("/dashboard", async (req, res) => {
    try {
        let stones = await stoneService.getAllStones().lean();

        stones = lowerToCapital(stones);

        res.render("home/dashboard", { stones });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/dashboard", { stones, error: message });
    }
});

router.get("/search", async (req, res) => {
    const name = req.query.searchName;

    try {
        let results = await stoneService.search(name).lean();

        results = lowerToCapital(results);
    
        res.render("home/search", { results });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/search", { error: message });
    }
});

module.exports = router;