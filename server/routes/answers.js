const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const answersController = require('../controllers/answers');

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
    [
        auth,
        [
            check('text','text is required')
                .not()
                .isEmpty()
        ]
    ], answersController.addAnswer);

/** @route      DELETE /api/posts/answers/:id
 *  @desc       delete an answer to a post
 *  @access     Private
 */
router.delete('/:id', auth , answersController.deleteAnswer);

module.exports = router;