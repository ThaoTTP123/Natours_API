const express = require('express');
const tourController = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');
const router = express.Router();
// router.param('id', tourController.checkId);
router.use('/:tourId/reviews', reviewRouter);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    protect,
    restrictTo('admin', 'tour-guide', 'guide'),
    tourController.getMonthlyPlan
  );
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    protect,
    restrictTo('admin', 'tour-guide'),
    tourController.createNewTour
  );
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(protect, restrictTo('admin', 'tour-guide'), tourController.updateTour)
  .delete(
    protect,
    restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
