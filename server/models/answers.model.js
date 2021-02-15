const helperFunction = require('../helpers/helperFunction');

const Answer = function (answer) {
  this.body = answer.body;
  this.user_id = answer.user_id;
  this.post_id = answer.post_id;
};

Answer.create = (newAnswer, result) => {
  const query = `INSERT INTO answers(body,user_id,post_id) VALUES(?,?,?);`;

  pool.query(
    query,
    [newAnswer.body, newAnswer.user_id, newAnswer.post_id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(
          helperFunction.responseHandler(
            false,
            err.statusCode,
            err.message,
            null
          ),
          null
        );
        return;
      }
      result(
        null,
        helperFunction.responseHandler(true, 200, 'Answer Added', res.insertId)
      );
    }
  );
};

Answer.remove = (id, result) => {
  const query = ` DELETE FROM answers WHERE id = ?;`;

  pool.query(query, id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
          false,
          err.statusCode,
          err.message,
          null
        ),
        null
      );
      return;
    }
    result(
      null,
      helperFunction.responseHandler(true, 200, 'Answer Removed', null)
    );
  });
};

Answer.retrieveAll = (postId, result) => {
  let query = ` SELECT
                    answers.id, post_id, answers.user_id, username, answers.body, answers.created_at 
                    FROM answers 
                    JOIN posts ON posts.id = post_id 
                    JOIN users ON users.id = answers.user_id 
                    WHERE post_id = ?;`;

  pool.query(query, postId, (err, results) => {
    if (err || results.length === 0) {
      console.log('error: ', err);
      result(
        helperFunction.responseHandler(
          false,
          err ? err.statusCode : 404,
          err ? err.message : 'There are no answers',
          null
        ),
        null
      );
      return;
    }
    result(null, helperFunction.responseHandler(true, 200, 'Success', results));
  });
};

module.exports = Answer;
