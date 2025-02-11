const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error('Incorrect email or password');

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const newUser = await User.create({ email, password, name });

    res.status(200).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data',
    });
  }
};
