import express from 'express';
import reviewControllers from '../../controllers/reviewController.js';

const reviewRouter = express.Router();

reviewRouter.post('/reviews', reviewControllers.createReview);
reviewRouter.put('/reviews/:id', reviewControllers.updateReview);
reviewRouter.get('/reviews/:id', reviewControllers.getReviewById);
reviewRouter.get('/reviews', reviewControllers.getAllReviews);
reviewRouter.delete('/reviews/:id', reviewControllers.deleteReview);

export default reviewRouter;
