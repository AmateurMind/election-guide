const { Router } = require('express');
const { getTimeline } = require('../controllers/timelineController');
const router = Router();
router.get('/', getTimeline);
module.exports = router;
