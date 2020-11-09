const express = require('express');
const router = express.Router();
const tagsController = require('../controllers/tags');

/** @route      GET /api/tags
 *  @desc       fetch all tags
 *  @access     Private
 */
router.get('/', tagsController.getTags);

/** @route      GET /api/posts/:id
 *  @desc       fetch a single post
 *  @access     Private
 */
router.get('/:tagname', tagsController.getSingleTag);

module.exports = router;