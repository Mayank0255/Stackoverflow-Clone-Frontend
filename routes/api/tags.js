const express = require('express');
const router = express.Router();

// @route    /api/tags
// @access   Private

//----------------------------------------- TAGS ROUTE ----------------------------------------------------------------


router.get('/',function(req,res){
    try {
        connection.query("SELECT tags.id,posts.id,tagname,COUNT(DISTINCT posts.id) as posts_count,tags.created_at FROM tags LEFT JOIN posttag ON posttag.tag_id = tags.id LEFT JOIN posts ON posts.id = posttag.post_id GROUP BY tags.id ORDER BY posts_count DESC;",
            function(err, results) {
                if (err) throw err;
                if (results.length == 0){
                    res.status(400).json({ msg: 'There are no tags' });
                } else {
                    res.json(results);
                }
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;