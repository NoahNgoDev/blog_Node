const express = require('express');
const router = express.Router();

const meController = require('../app/controller/MeController');

router.get('/upload/courses', meController.uploadStory);
router.get('/trash/courses', meController.trashStory);


module.exports = router;        