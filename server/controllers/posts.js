const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');
const Post = require('../models/posts.model');

const getPosts = (req, res) => {
    let action;
    const { tagname } = req.params;

    if (tagname) {
        action = 'tag';
    } else {
        action = req.url.includes('top') ? 'top' : 'basic';
    }
    try {
        Post.retrieveAll({'action': action, 'tagName': tagname}, (err, data) => {
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
            .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
    }
};

const getSinglePost = (req,res) => {
    try {
        Post.retrieveOne(req.params.id, (err, data) => {
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

const addPost = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    }
    try {
        const post = new Post({
            title: req.body.title,
            body: req.body.body,
            userId: req.user.id,
            tagname: req.body.tagname
        });
        // Save Post in the database
        Post.create(post, (err, data) => {
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

const deletePost = (req,res) => {
    const { id } = req.params;

    try {
        pool.query( `SELECT user_id FROM posts WHERE id = ?;`,
            id,
            (err,results) => {
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
            });
        Post.remove(id, (err, data) => {
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


module.exports = postsController = {
    getPosts,
    getSinglePost,
    addPost,
    deletePost
};