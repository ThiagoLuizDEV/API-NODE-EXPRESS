const validateBody = (req, res, next) => {
  const { body } = req;
  const BAD_REQUEST = 400;

  if (!body.title) {
    return res.status(BAD_REQUEST).json({ message: 'the field "title" is required' });
  }
  if (body.title === '') {
    return res.status(BAD_REQUEST).json({ message: 'title cannot be empty' });
  }
  next();
};

module.exports = {
  validateBody,
};
