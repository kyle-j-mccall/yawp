const { Review } = require('../models/Review');

module.exports = async (req, res, next) => {
  const review = await Review.getById(req.params.id);

  console.log('reviewww', review);
  console.log('userrr', req.user);
  try {
    if (
      req.user &&
      (req.user.id === review.user_id || req.user.email === 'admin')
    ) {
      next();
    } else {
      throw new Error('You do not have access to view this page');
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
