const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

// @route    /api/posts/answers
// @access   Private

router.get('/:id',(req, res) => {
    try {
        connection.query( ` SELECT 
                                    answers.id, post_id, answers.user_id, username, answers.text, answers.created_at 
                                    FROM answers 
                                    JOIN posts ON posts.id = post_id 
                                    JOIN users ON users.id = answers.user_id 
                                    WHERE post_id = ${req.params.id};`,
            (err, results) => {
            if (err) throw err;
            if (results.length === 0){
                return res.status(400).json({ msg: 'There are no answers for this post' });
            } else {
                return res.json(results);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
});

//add answer to post
router.post(
    '/:id',
    [
        auth,
        [
            check('text','text is required')
                .not()
                .isEmpty()
        ]
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            try {
                connection.query(
                    'INSERT INTO answers(text,user_id,post_id) VALUES(?,?,?);'
                    , [req.body.text, req.user.id, req.params.id ] ,
                    (err,results) => {
                        if (err) throw err;
                        return res.json({ msg: 'Answer to the Respective Post Added Successfully' });
                    });
            } catch (err) {
                console.log(err);
                return res.status(500).send('Server Error');
            }
        }
    });

//DELETE ROUTE
router.delete('/:id', auth , (req, res) => {
    try {
        connection.query( ` SELECT user_id 
                                    FROM answers 
                                    WHERE id = ${req.params.id};`,
            (err, results) => {
            if (err) throw err;
            if (results[0].user_id !== req.user.id ){
                return res.status(401).json({ msg: 'User not authorized to delete' });
            } else {
                connection.query("DELETE FROM answers WHERE id = " + req.params.id , (err, results) => {
                    if (err) throw err;
                    return res.json({ msg: 'Answer Deleted' });
                });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;