import express from 'express';
import validator from 'express-validator';
import auth from '../middleware/auth.js';
import checkOwnership from '../middleware/checkOwnership.js';
import commentsController from '../controllers/comments.js';

const {check} = validator;
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

export default router;
