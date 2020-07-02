const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const helperFunction = require('../helpers/helperFunction');
const { validationResult } = require('express-validator');

const getAllUsers = (req, res) => {
    try {
        const query = ` SELECT 
                        users.id,username,users.created_at,COUNT(DISTINCT posts.id) 
                        as posts_count,COUNT(DISTINCT tagname) as tags_count 
                        FROM users 
                        LEFT JOIN posts ON posts.user_id = users.id 
                        LEFT JOIN posttag ON posttag.post_id = posts.id 
                        LEFT JOIN tags ON posttag.tag_id = tags.id 
                        GROUP BY users.id ORDER BY posts_count DESC;`
        connection.query(query,
            (err, results) => {
                if (err) {
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                if (results.length === 0){
                    return res
                        .status(400)
                        .json(helperFunction.responseHandler(false, 400, 'There are no users', null));
                }

                return res
                    .status(200)
                    .json(helperFunction.responseHandler(true, 200, 'success', results));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const getSingleUser = (req, res) => {
    try {
        connection.query( ` SELECT 
                                    users.id,username,users.created_at,COUNT(DISTINCT posts.id) 
                                    as post_count,COUNT(DISTINCT tagname) 
                                    as tag_count, COUNT(DISTINCT answers.id) 
                                    as answer_count, COUNT(DISTINCT comments.id) 
                                    as comment_count 
                                    FROM users 
                                    LEFT JOIN posts ON posts.user_id = users.id 
                                    LEFT JOIN posttag ON posttag.post_id = posts.id 
                                    LEFT JOIN tags ON tags.id = posttag.tag_id 
                                    LEFT JOIN answers ON answers.user_id = users.id 
                                    LEFT JOIN comments ON comments.user_id = users.id 
                                    WHERE users.id = ? GROUP BY users.id;`,
            [ req.params.id ],
            (err, results) => {
                if (err) {
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                if (results.length === 0){
                    return res
                        .status(400)
                        .json(helperFunction.responseHandler(false, 400, 'This user doesn\'t exists', null));
                }

                return res
                    .status(200)
                    .json(helperFunction.responseHandler(true, 200, 'success', results[0]));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const register = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }
    const { username,password } = req.body;

    try{
        let user;
        connection.query(`SELECT * FROM users WHERE username = '${username}';`,async (err, results) => {
            if (err) {
                return res
                    .status(err.statusCode)
                    .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
            }
            if (results[0]){
                return res
                    .status(400)
                    .json(helperFunction.responseHandler(false, 400, 'User already exists', null));
            }

            user = { username, password };
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await connection.query('INSERT INTO users(username,password) VALUES(?,?)',
                [ user.username,user.password ],
                (err, results, fields) => {
                    if (err) {
                        return res
                            .status(err.statusCode)
                            .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                    }
                    console.log(results);
                });

            connection.query(`SELECT * FROM users WHERE username = '${username}';`,
                (err, results) => {
                    if (err) {
                        return res
                            .status(err.statusCode)
                            .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                    }
                    user = results[0];

                    const payload = {
                        user: {
                            id: user.id
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
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
    }
};

module.exports = usersController = {
    getAllUsers,
    getSingleUser,
    register
};