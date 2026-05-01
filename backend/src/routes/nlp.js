const { Router } = require('express');
const { handleNlpQuery } = require('../controllers/nlpController');
const router = Router();
router.post('/', handleNlpQuery);
module.exports = router;
