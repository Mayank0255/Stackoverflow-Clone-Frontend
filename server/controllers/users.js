import validator from 'express-validator';
import helperFunction from '../helpers/helperFunction.js';
import User from '../models/users.model.js';

const {validationResult} = validator;

const getUsers = (req, res) => {
  try {
    const {id} = req.params;

    User.retrieve(
      {
        action: id ? 'one' : 'all',
        id: id || null,
      },
      (err, data) => {
        if (err) {
          console.log(err);
          return res.status(err.code).json(err);
        }
        return res.status(data.code).json(data);
      }
    );
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json(helperFunction.responseHandler(false, 500, 'Server Error', null));
  }
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(
        helperFunction.responseHandler(false, 400, errors.array()[0].msg, null)
      );
  }
  try {
    // Register user in the database
    await User.register(new User(req.body), (err, data) => {
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
  getUsers,
  register,
};
