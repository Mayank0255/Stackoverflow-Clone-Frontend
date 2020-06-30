const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const answersController = require('../controllers/answers');

// @route    /api/posts/answers
// @access   Private

router.get('/:id', answersController.getAnswers);
//add answer to post
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

//DELETE ROUTE
router.delete('/:id', auth , answersController.deleteAnswer);

module.exports = router;