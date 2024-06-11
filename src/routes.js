const router = require("express").Router();

const homeController = require("./controllers/homeController");
const stonesController = require("./controllers/stonesController");
const authController = require("./controllers/authController");

router.use(homeController);
router.use("/stones", stonesController);
router.use(authController);

router.get("*", (req, res) => res.render("home/404"));

module.exports = router;