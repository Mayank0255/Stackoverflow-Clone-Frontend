const helperFunction = require('../helpers/helperFunction')

module.exports = (req ,res , next) => {
    let action;
    if (req.originalUrl.includes('posts')) {
        if (req.originalUrl.includes('answers')) {
            action = 'answers';
        } else if (req.originalUrl.includes('comments')) {
            action = 'comments';
        } else {
            action = 'posts';
        }
    }
    const query = ` SELECT user_id FROM ${action} WHERE id = ?;`;

    pool.query(query,
        req.params.id,
        (err, results) => {
            if (err) {
                console.log('error: ', err);
                return res.status(err.statusCode).json(helperFunction.responseHandler(false, err.statusCode, err.message, null));
            }
            if (results[0].user_id !== req.user.id ){
                console.log('error: User not authorized to delete');
                return res.json(helperFunction.responseHandler(false, 401, 'User not authorized to delete', null));
            }
            next();
        });
}