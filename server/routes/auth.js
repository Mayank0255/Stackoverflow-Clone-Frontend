const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');

// @route    /api/auth
// @access   Private
// ===================================== LOGIN ROUTE OR AUTH ROUTE ==================================================


router.get('/' , auth , authController.loadUser);


router.post(
    '/',
    [
        check('username', 'Please include a valid username'),
        check(
            'password',
            'Password is required'
        ).exists()
    ], authController.login);

module.exports = router;