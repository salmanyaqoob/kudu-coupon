/**
 * Created by Salman on 12/16/2017.
 */

const { User } = require('./../user/user.model');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    return next();
  }).catch((e) => {
    res.status(401).send(e);
  });
};

module.exports = { authenticate };

