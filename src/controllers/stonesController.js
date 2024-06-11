const router = require("express").Router();

router.get("/create", (req, res) => {
    res.render("stones/create");
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