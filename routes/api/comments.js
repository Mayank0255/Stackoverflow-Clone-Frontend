const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route    /api/posts/comments
// @access   Private

//comments from the logged in user
router.get('/me', auth , function(req,res) {
    try {
        connection.query("SELECT comments.id,post_id,comments.user_id,comments.body, comments.created_at FROM comments JOIN users ON users.id = comments.user_id WHERE user_id = " + req.user.id + ";", function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no comments from this user.' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



//comments of a particular post
router.get('/:id',function(req,res) {
    try {
        connection.query("SELECT comments.id,post_id,comments.user_id,username,comments.body, comments.created_at FROM comments JOIN posts ON posts.id = comments.post_id JOIN users ON users.id = comments.user_id WHERE post_id = " + req.params.id + ";", function(err, results) {
            if (err) throw err;
            if (results.length == 0){
                res.status(400).json({ msg: 'There are no comments for this post' });
            } else {
                res.json(results);
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

//add comment to post
router.post(
    '/:id',
    [
        auth,
        [
            check('body','body is required')
                .not()
                .isEmpty()
        ]
    ], function (req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            try {
                connection.query(
                    'INSERT INTO comments(body,user_id,post_id) VALUES(?,?,?);'
                    , [req.body.body, req.user.id, req.params.id ] ,
                    function(err,results) {
                        if (err) throw err;
                        res.json({ msg: "Comment Added Successfully" });
                    });
            } catch (err) {
                console.log(err.message);
                res.status(500).send('Server Error');
            }

        }
    });

//DELETE ROUTE
router.delete('/:id', auth , function(req,res){
    try {
        connection.query("SELECT user_id FROM comments WHERE id = ?;",[req.params.id] ,function(err,results) {
            if (err) throw err;
            if (results[0].user_id !== req.user.id ){
                return res.status(401).json({ msg: 'User not authorized to delete' });
            } else {
                connection.query("DELETE FROM comments WHERE id = ?;", [req.params.id], function(err, results) {
                    if (err) throw err;
                    res.json({ msg: 'Comment Deleted' });
                });
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



module.exports = router;