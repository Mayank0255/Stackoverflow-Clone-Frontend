import express from 'express';
import tagsController from '../controllers/tags.js';

const router = express.Router();

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

export default router;
