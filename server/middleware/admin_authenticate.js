/**
 * Created by Salman on 12/16/2017.
 */

const { Admin } = require('./../admin/admin.model');

const adminAuthenticate = (req, res, next) => {
  const token = req.header('x-auth');

  Admin.findByToken(token).then((admin) => {
    if (!admin) {
      return Promise.reject();
    }
    req.admin = admin;
    req.token = token;
    return next();
  }).catch((e) => {
    res.status(401).send(e);
  });
};

module.exports = { adminAuthenticate };

