const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const adminCtrl = require('./admin.controller.js');
const { adminAuthenticate } = require('./../middleware/admin_authenticate');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/admins - Get list of admins */
  .get(validate(paramValidation.adminList), adminAuthenticate, adminCtrl.list)

  /** POST /api/admins - Create new admin */
  .post(validate(paramValidation.createAdmin),
    adminAuthenticate,
    adminCtrl.create);

router.route('/me')
  .get(adminAuthenticate, (req, res) => {
    res.send(req.admin);
  });

router.route('/me/token')
  .delete(adminAuthenticate, adminCtrl.logout);

/**
 * POST /admins/change-password
 * Change user password
 * */
router.route('/change-password')
  .post(validate(paramValidation.adminPasswordChange),
    adminAuthenticate, adminCtrl.changePassword);

router.route('/:adminId')
  /** GET /api/admins/:adminId - Get admin */
  .get(adminCtrl.get)

  /** PUT /api/admins/:adminId - Update user */
  .put(validate(paramValidation.updateAdmin), adminAuthenticate, adminCtrl.update)

  /** DELETE /api/admins/:adminId - Delete user */
  .delete(adminAuthenticate, adminCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('adminId', adminCtrl.load);

module.exports = router;
