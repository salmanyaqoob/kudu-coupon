const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const prizeCtrl = require('./prize.controller');
// const { authenticate } = require('./../middleware/authenticate');
const { adminAuthenticate } = require('./../middleware/admin_authenticate');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/prizes - Get list of prizes */
  .get(adminAuthenticate, prizeCtrl.list)

  /** POST /api/prizes - Create new prize */
  .post(adminAuthenticate, validate(paramValidation.createPrize), prizeCtrl.create);

router.route('/:prizeId')
  /** GET /api/prizes/:prizeId - Get prize */
  .get(adminAuthenticate, prizeCtrl.get)

  /** PUT /api/prizes/:prizeId - Update prize */
  .put(validate(paramValidation.updatePrize), adminAuthenticate, prizeCtrl.update)

  /** DELETE /api/prizes/:prizeId - Delete prize */
  .delete(adminAuthenticate, prizeCtrl.remove);

router.param('prizeId', prizeCtrl.load);

module.exports = router;
