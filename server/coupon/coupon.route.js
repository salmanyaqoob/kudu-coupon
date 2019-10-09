const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const couponCtrl = require('./coupon.controller');
// const {authenticate} = require('./../middleware/authenticate');
const { adminAuthenticate } = require('./../middleware/admin_authenticate');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/coupons - Get list of coupons */
  .get(adminAuthenticate, couponCtrl.list)

  /** POST /api/coupons - Create new coupon */
  .post(adminAuthenticate, validate(paramValidation.createCoupon), couponCtrl.create);


router.route('/:couponId')
  /** GET /api/coupons/:couponId - Get coupon */
  .get(adminAuthenticate, couponCtrl.get)

  /** PUT /api/coupons/:couponId - Update user */
  .put(validate(paramValidation.updateCoupon), adminAuthenticate, couponCtrl.update)

  /** DELETE /api/coupons/:couponId - Delete user */
  .delete(adminAuthenticate, couponCtrl.remove);

/** Load user when API with userId route parameter is hit */

router.route('/:couponId/qr')
  /** GET /api/coupons/:couponId/qr - Get coupon qr codes*/
  .get(adminAuthenticate, couponCtrl.getQR)

  .post(adminAuthenticate, validate(paramValidation.createCouponQR), couponCtrl.createQR);

router.route('/:couponId/qr/count')
  /** GET /api/coupons/:couponId/qr - Get coupon qr codes*/
  .get(adminAuthenticate, couponCtrl.getQRCount);


router.route('/:couponId/qr/:couponQRID')
  /** DELETE /api/coupons/:couponId/qr/:couponQRID - Delete qr codes */
  .delete(adminAuthenticate, couponCtrl.removeQR);


router.param('couponId', couponCtrl.load);


module.exports = router;
