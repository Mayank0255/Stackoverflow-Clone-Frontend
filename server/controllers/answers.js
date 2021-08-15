import validator from 'express-validator';
import helperFunction from '../helpers/helperFunction.js';
import Answer from '../models/answers.model.js';

const {validationResult} = validator;

const getAnswers = (req, res) => {
  try {
    console.log(req);
    Answer.retrieveAll(req.params.id, (err, data) => {
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

const addAnswer = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        helperFunction.responseHandler(false, 400, errors.array()[0].msg, null)
      );
  }
  try {
    const answer = new Answer({
      body: req.body.text,
      user_id: req.user.id,
      post_id: req.params.id,
    });
    // Save Answer in the database
    Answer.create(answer, (err, data) => {
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

const deleteAnswer = async (req, res) => {
  try {
    Answer.remove(req.params.id, (err, data) => {
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

export default {
  getAnswers,
  addAnswer,
  deleteAnswer,
};
