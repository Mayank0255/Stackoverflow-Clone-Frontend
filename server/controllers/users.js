const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const helperFunction = require('../helpers/helperFunction');
const User = require('../models/users.model');
const { validationResult } = require('express-validator');

const getUsers = (req, res) => {
    try {
        const { id } = req.params;

        User.retrieve({'action': id ? 'one' : 'all', 'id': id ? id : null}, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(err.code).json(err);
            }
            return res.status(data.code).json(data);
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const register = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }
    const { username,password } = req.body;

    try{
        let user = { username, password };
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await pool.query('INSERT INTO users(username,password) VALUES(?,?)',
            [ user.username,user.password ],
            (err, results, fields) => {
                if (err) {
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }

                const payload = {
                    user: {
                        id: results.insertId
                    }
                };

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 3600000 },
                    (err, token) => {
                        if (err) throw err;
                        return res
                            .status(200)
                            .json(helperFunction.responseHandler(true, 200, 'User registered', {'token': token}));
                    });
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
    }
};

module.exports = usersController = {
    getUsers,
    register
};