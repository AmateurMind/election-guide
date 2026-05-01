const { Router } = require("express");
const { getGuide } = require("../controllers/guideController");
const router = Router();
router.get("/", getGuide);
module.exports = router;
