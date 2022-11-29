const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Review } = require('../models/Review');

module.exports = Router().delete(
  '/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const review = await Review.delete(req.params.id);
      res.json(review);
    } catch (e) {
      next(e);
    }
  }
);
