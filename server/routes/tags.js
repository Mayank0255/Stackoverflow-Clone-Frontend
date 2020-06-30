const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags');

// @route    /api/tags
// @access   Private

router.get('/', tagsController.getTags);

module.exports = router;