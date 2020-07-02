const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');

/** @route      GET /api/auth
 *  @desc       fetch logged in user details
 *  @access     Private
 */
router.get('/' , auth , authController.loadUser);

/** @route      POST /api/auth
 *  @desc       log in user
 *  @access     Private
 */
router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Password is required'
        ).not().isEmpty()
    ], authController.login);

module.exports = router;