const express = require('express');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const checkOwnership = require('../middleware/checkOwnership');
const commentsController = require('../controllers/comments');

const router = express.Router();

/** @route      GET /api/posts/comments/:id
 *  @desc       fetch all comments of a post
 *  @access     Private
 */
router.get('/:id', commentsController.getComments);

/** @route      POST /api/posts/comments/:id
 *  @desc       add a comment to a post
 *  @access     Private
 */
router.post(
  '/:id',
  [auth, [check('body', 'Comment is required').not().isEmpty()]],
  commentsController.addComment
);

/** @route      DELETE /api/posts/comments/:id
 *  @desc       delete a comment to a post
 *  @access     Private
 */
router.delete('/:id', [auth, checkOwnership], commentsController.deleteComment);

module.exports = router;
