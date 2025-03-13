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
  const { email, password, name } = req.body;
  const newUser = await User.create({ email, password, name });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
