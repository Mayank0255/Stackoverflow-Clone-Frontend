import express from 'express';
import validator from 'express-validator';
import auth from '../middleware/auth.js';
import checkOwnership from '../middleware/checkOwnership.js';
import answersController from '../controllers/answers.js';

const router = express.Router();

/** @route      GET /api/posts/answers/:id
 *  @desc       fetch all answers of a post
 *  @access     Private
 */
router.get('/:id', answersController.getAnswers);

/** @route      POST /api/posts/answers/:id
 *  @desc       add an answer to a post
 *  @access     Private
 */
router.post(
  '/:id',
  [auth, [validator.check('text', 'Answer is required').not().isEmpty()]],
  answersController.addAnswer
);

/** @route      DELETE /api/posts/answers/:id
 *  @desc       delete an answer to a post
 *  @access     Private
 */
router.delete('/:id', [auth, checkOwnership], answersController.deleteAnswer);

export default router;
