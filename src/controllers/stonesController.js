const router = require("express").Router();

const stoneService = require("../services/stoneService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/create", (req, res) => {
    res.render("stones/create");
});

router.post("/create", async (req, res) => {
    const stoneBody = {
        ...req.body,
        owner: req.user._id,
    }
    console.log(stoneBody);
    
    try {
        await stoneService.create(stoneBody);

        res.redirect("/dashboard");
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("stones/create", { ...stoneBody, error: message });
    }
});

router.get("/:stoneId", (req, res) => {
    const stoneId = req.params.stoneId;
    // Add stone information

    res.render("stones/details");
});

router.get("/:stoneId/edit", (req, res) => {
    const stoneId = req.params.stoneId;
    // Add stone information

    res.render("stones/edit");
});

module.exports = router;