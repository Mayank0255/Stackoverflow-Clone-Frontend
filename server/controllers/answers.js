const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');

const getAnswers = (req, res) => {
    try {
        connection.query( ` SELECT 
                                    answers.id, post_id, answers.user_id, username, answers.text, answers.created_at 
                                    FROM answers 
                                    JOIN posts ON posts.id = post_id 
                                    JOIN users ON users.id = answers.user_id 
                                    WHERE post_id = ${req.params.id};`,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                if (results.length === 0){
                    return res
                        .status(400)
                        .json(helperFunction.responseHandler(false, 400, 'There are no answers', null));
                }
                return res
                    .status(200)
                    .json(helperFunction.responseHandler(false, 200, 'Success', results));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const addAnswer = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }

    try {
        connection.query(
            'INSERT INTO answers(text,user_id,post_id) VALUES(?,?,?);'
            , [req.body.text, req.user.id, req.params.id ] ,
            (err,results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                return res
                    .status(200)
                    .json(helperFunction.responseHandler(true, 200, 'Answer Added', results.insertId));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const deleteAnswer = (req, res) => {
    try {
        connection.query( ` SELECT user_id
                                    FROM answers
                                    WHERE id = ${req.params.id};`,
            (err, results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                if (results[0].user_id !== req.user.id ){
                    return res
                        .status(401)
                        .json(helperFunction.responseHandler(false, 401, 'User not authorized to delete', null));
                }

                connection.query("DELETE FROM answers WHERE id = " + req.params.id , (err, results) => {
                    if (err) {
                        console.log(err);
                        return res
                            .status(err.statusCode)
                            .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                    }
                    return res
                        .status(200)
                        .json(helperFunction.responseHandler(true, 200, 'Answer Removed', null));
                });
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

module.exports = answersController = {
    getAnswers,
    addAnswer,
    deleteAnswer
};