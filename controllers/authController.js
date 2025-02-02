exports.logIn = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'log in',
  });
};
