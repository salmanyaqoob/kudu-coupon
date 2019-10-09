const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const { authenticate } = require('./../middleware/authenticate');
const { adminAuthenticate } = require('./../middleware/admin_authenticate');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(adminAuthenticate, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/me')
  /** GET /api/users/me - Get user info */
  .get(authenticate, (req, res) => {
    res.send(req.user);
  });

router.route('/me/token')
  /** DELETE /api/users/me/token - remove user token */
  .delete(authenticate, userCtrl.logout);

/**
 * POST /api//users/change-password
 * Change user password
 * */
router.route('/change-password')
  .post(validate(paramValidation.passwordChange), authenticate, userCtrl.changePassword);


router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(authenticate, userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), authenticate, userCtrl.update)

  /** PATCH /api/users/:userId - Update user */
  .patch(validate(paramValidation.updateUser), adminAuthenticate, userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(adminAuthenticate, userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;
