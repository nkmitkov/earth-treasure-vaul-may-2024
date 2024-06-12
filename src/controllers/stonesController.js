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

    try {
        await stoneService.create(stoneBody);

        res.redirect("/dashboard");
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("stones/create", { ...stoneBody, error: message });
    }
});

router.get("/:stoneId", async (req, res) => {
    const currentUserId = req.user._id;

    try {
        const stone = await stoneService.getStoneById(req.params.stoneId).lean();
        const isOwner = currentUserId == stone.owner;
        let isStoneLiked;

        if (!isOwner) {
            // if there is a match return true otherwise false
            isStoneLiked = stone.likedList.find((id) => id == currentUserId);
        }

        res.render("stones/details", { ...stone, isOwner, isStoneLiked });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/dashboard", { error: message });
    }
});

router.get("/:stoneId/edit", async (req, res) => {
    try {
        const stone = await stoneService.getStoneById(req.params.stoneId).lean();

        res.render("stones/edit", { ...stone });
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/dashboard", { error: message });
    }
});

router.post("/:stoneId/edit", async (req, res) => {
    const editedStoneId = req.params.stoneId;
    const editedStone = req.body;

    try {
        await stoneService.update(editedStoneId, editedStone);

        res.redirect(`/stones/${editedStoneId}`);
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/dashboard", { error: message });
    }
});

router.get("/:stoneId/delete", async (req, res) => {
    const stoneId = req.params.stoneId;

    try {
        await stoneService.del(stoneId);

        res.redirect("/dashboard");
    } catch (error) {
        const message = getErrorMessage(error);

        res.status(400).render("home/dashboard", { error: message });
    }
});

router.get("/:stoneId/like", async (req, res) => {
    const stoneId = req.params.stoneId;
    const currentUserId = req.user._id;
    
    try {
        const stone = await stoneService.getStoneById(stoneId).lean();
        stone.likedList.push(currentUserId);
        await stoneService.update(stoneId, stone);

        res.redirect(`/stones/${stoneId}`);
    } catch (error) {
        const message = getErrorMessage(error);
        
        res.status(400).redirect("/dashboard", { error: message });
    }

});

module.exports = router;