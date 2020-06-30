const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const usersController = require('../controllers/users');

// @route    /api/users
// @access   Private
//GET ALL USERS
router.get('/', usersController.getAllUsers);

//GET SINGLE USER
router.get('/:id', usersController.getSingleUser);

router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Please enter a password with 5 or more characters'
        ).isLength({ min: 5 })
    ], usersController.register);

module.exports = router;