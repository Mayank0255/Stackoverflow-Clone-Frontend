import validator from 'express-validator';
import helperFunction from '../helpers/helperFunction.js';
import User from '../models/users.model.js';

const loadUser = (req, res) => {
  try {
    User.loadUser(req.user.id, (err, data) => {
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

const login = (req, res) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        helperFunction.responseHandler(false, 400, errors.array()[0].msg, null)
      );
  }
  try {
    // Login the user
    User.login(new User(req.body), (err, data) => {
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

export default {
  loadUser,
  login,
};
