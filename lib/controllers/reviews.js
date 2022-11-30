const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorizeDelete = require('../middleware/authorize-delete');
// const authorize = require('../middleware/authorize');

const { Review } = require('../models/Review');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) next();
      res.json(review);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', [authenticate, authorizeDelete], async (req, res, next) => {
    console.log(req.user);
    try {
      const review = await Review.delete(req.params.id);
      res.json(review);
    } catch (e) {
      next(e);
    }
  });
