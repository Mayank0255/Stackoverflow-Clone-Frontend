const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags');

/** @route      GET /api/tags
 *  @desc       fetch all tags
 *  @access     Private
 */
router.get('/', tagsController.getTags);

module.exports = router;