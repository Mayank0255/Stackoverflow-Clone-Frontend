const { validationResult } = require('express-validator');
const helperFunction = require('../helpers/helperFunction');

const getAllPosts = (req,res) => {
    try {
        const q = ` SELECT 
                    posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) 
                    as answer_count,COUNT(DISTINCT comments.id) 
                    as comment_count,tag_id,title,posts.body,tagname,posts.created_at 
                    FROM posts 
                    JOIN posttag ON posts.id = post_id 
                    JOIN tags ON tag_id = tags.id 
                    JOIN users ON user_id = users.id 
                    LEFT JOIN answers ON answers.post_id = posts.id 
                    LEFT JOIN comments ON posts.id = comments.post_id 
                    GROUP BY posts.id 
                    ORDER BY posts.created_at DESC;`;
        connection.query(q,
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
                        .json(helperFunction.responseHandler(false, 400, 'There are no posts', null));
                }

                return res
                    .status(200)
                    .json(helperFunction.responseHandler(true, 200, 'success', results));
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(true, 500, 'Server Error', null));
    }
};

const getTopPosts = (req, res) => {
    try {
        const q = ` SELECT 
                    posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) 
                    as answer_count,COUNT(DISTINCT comments.id) 
                    as comment_count,tag_id,title,posts.body,tagname,posts.created_at 
                    FROM posts 
                    JOIN posttag ON posts.id = post_id 
                    JOIN tags ON tag_id = tags.id 
                    JOIN users ON user_id = users.id 
                    LEFT JOIN answers ON answers.post_id = posts.id 
                    LEFT JOIN comments ON posts.id = comments.post_id 
                    GROUP BY posts.id 
                    ORDER BY answer_count DESC,comment_count DESC;`;
        connection.query(q,
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
                        .json(helperFunction.responseHandler(false, 400, 'There are no posts', null));
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

const getTagPosts = (req,res) => {
    try {
        connection.query(`  SELECT
                                    posts.id,posts.user_id,username,COUNT(DISTINCT answers.id) 
                                    as answer_count,COUNT(DISTINCT comments.id) 
                                    as comment_count,tag_id,title,posts.body,tagname,posts.created_at 
                                    FROM posts 
                                    JOIN posttag ON posts.id = post_id 
                                    JOIN tags ON tag_id = tags.id 
                                    JOIN users ON user_id = users.id 
                                    LEFT JOIN answers ON answers.post_id = posts.id 
                                    LEFT JOIN comments ON posts.id = comments.post_id 
                                    WHERE tags.tagname = '${req.params.tagname}' 
                                    GROUP BY posts.id 
                                    ORDER BY posts.created_at DESC;`,
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
                        .json(helperFunction.responseHandler(false, 400, 'There are no posts for this tag', null));
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

const getSinglePost = (req,res) => {
    try {
        const q = ` SELECT 
                    posts.id,posts.user_id,tag_id,COUNT(DISTINCT answers.id) 
                    as answer_count,COUNT(DISTINCT comments.id) 
                    as comment_count,username,title,posts.body 
                    as post_body,tagname,posts.created_at 
                    FROM posts 
                    JOIN posttag ON posts.id = post_id 
                    JOIN tags ON tag_id = tags.id 
                    JOIN users ON user_id = users.id 
                    LEFT JOIN answers ON answers.post_id = posts.id 
                    LEFT JOIN comments ON posts.id = comments.post_id 
                    WHERE posts.id = ${req.params.id};`;
        connection.query(q,
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
                        .json(helperFunction.responseHandler(false, 400, 'There isn\'t any post by this id', null));
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

const addPost = (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json(helperFunction.responseHandler(false, 400, errors.array()[0].msg, null));
    } else {
        try {
            connection.query(
                'INSERT INTO posts(title,body,user_id) VALUES (?,?,?);SET @v1 := (SELECT LAST_INSERT_ID());INSERT IGNORE INTO tags(tagname) VALUES (?);SET @v2 := (SELECT id FROM tags WHERE tagname = ?);INSERT INTO posttag(post_id,tag_id) VALUES(@v1,@v2);'
                , [ req.body.title, req.body.body, req.user.id, req.body.tagname, req.body.tagname ],
                (err,results) => {
                    if (err) {
                        console.log(err);
                        return res
                            .status(err.statusCode)
                            .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                    }
                    return res
                        .status(200)
                        .json(helperFunction.responseHandler(true, 200, 'Post Created', results.insertId));
                });
        } catch (err) {
            console.log(err);
            return res
                .status(500)
                .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
        }

    }
};

const deletePost =  (req,res) => {
    try {
        connection.query( ` SELECT user_id 
                                    FROM posts 
                                    WHERE id = ${req.params.id};`,
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

                connection.query('DELETE FROM posttag WHERE post_id = ?; DELETE FROM comments WHERE post_id = ?; DELETE FROM answers WHERE post_id = ?; DELETE FROM posts WHERE id = ? ;' ,
                    [ req.params.id,req.params.id,req.params.id,req.params.id ] ,
                    (err, results) => {
                        if (err) {
                            console.log(err);
                            return res
                                .status(err.statusCode)
                                .json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
                        }
                        return res
                            .status(200)
                            .json(helperFunction.responseHandler(true, 200, 'Post Removed', null));
                    });
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
    }
};


module.exports = postsController = {
    getAllPosts,
    getTopPosts,
    getTagPosts,
    getSinglePost,
    addPost,
    deletePost
};