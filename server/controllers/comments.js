const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');

const getComments = (req,res) => {
    try {
        pool.query( ` SELECT
                                    comments.id, post_id, comments.user_id, username, comments.body, comments.created_at 
                                    FROM comments 
                                    JOIN posts ON posts.id = comments.post_id 
                                    JOIN users ON users.id = comments.user_id 
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
                        .json(helperFunction.responseHandler(false, 400, 'There are no comments for this post', null));
                }

                return res
                    .status(200)
                    .json(helperFunction.responseHandler(true, 200, 'Success', results));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const addComment = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }

    try {
        pool.query(
            'INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);'
            , [req.body.body, req.user.id, req.params.id ] ,
            (err,results) => {
                if (err) {
                    console.log(err);
                    return res
                        .status(err.statusCode)
                        .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                }
                return res
                    .status(200)
                    .json(helperFunction.responseHandler(true, 200, 'Comment Added Successfully', results.insertId));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

const deleteComment =  (req,res) => {
    try {
        pool.query('SELECT user_id FROM comments WHERE id = ?;',
            [req.params.id] ,
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

                pool.query("DELETE FROM comments WHERE id = ?;", [req.params.id], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res
                            .status(err.statusCode)
                            .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                    }
                    return res
                        .status(200)
                        .json(helperFunction.responseHandler(true, 200, 'Comment Deleted', null));
                });
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};

module.exports = commentsController = {
    getComments,
    addComment,
    deleteComment
};