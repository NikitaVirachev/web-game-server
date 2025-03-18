const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError('Incorrect email or password', 401));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, name } = req.body;
  const newUser = await User.create({ email, password, passwordConfirm, name });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
