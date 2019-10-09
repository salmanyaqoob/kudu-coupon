// const async = require('async');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const validator = require('validator');
const jwt = require('jsonwebtoken');
// const _ = require('lodash');
const bcrypt = require('bcryptjs');

let Admin = this;
/**
 * Admin Schema
 */

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    default: 'MANAGER'
  },
  is_active: {
    type: String,
    enum: ['ACTIVE', 'IN-ACTIVE'],
    default: 'ACTIVE'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
}, { usePushEach: true });


// const SALT_ROUNDS = 10;

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


/**
 * Pre-Save hooks
 */
AdminSchema.pre('save', function (next) {
  const admin = this;

  if (admin.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(admin.password, salt, (hashErr, hash) => {
        admin.password = hash;
        next();
        if (hashErr) { next(hashErr); }
      });
    });
  } else {
    next();
  }
});

AdminSchema.pre('update', function (next) {
  const password = this.getUpdate().$set.password;
  if (!password) {
    return next();
  }
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    this.getUpdate().$set.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
  return true;
});


/**
 * Methods
 */
AdminSchema.method({

  // toJSON(){
  //  var admin = this;
  //  var userObject = admin.toObject();
  //  return _.pick(userObject, ['_id', 'email']);
  // },
  toJSON() {
    const admin = this;
    const userObject = admin.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
      // return _.pick(userObject, ['_id', 'email']);
  },

  generateAuthToken() {
    const admin = this;
    const access = 'auth';

    // Generate a JWT token with _id, access = auth, expire for 1 hour.
    const token = jwt.sign({
      _id: admin._id.toHexString(),
      access,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) },
      process.env.JWT_SECRET).toString();

    admin.tokens.push({ access, token });

    return admin.save().then(() => token);
  },

  removeToken(token) {
    const admin = this;

    return admin.update(
      { $pull: { tokens: { token } } },
      { multi: true }
    ).catch((e) => { Promise.reject(e); });
  }


});


/**
 * Statics
 */
AdminSchema.statics = {

  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((admin) => {
        if (admin) {
          return admin;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find().select('_id name email role is_active createdAt')
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },

  findByToken(token) {
    Admin = this;
    let decode;

    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      // return new Promise((resolve, reject)=>{
      //    reject();
      // });
      const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    }

    return Admin.findOne({
      _id: decode._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  },

  findByTokenPassword(token) {
    Admin = this;
    let decode;

    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      // return new Promise((resolve, reject)=>{
      //    reject();
      // });
      const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
      return Promise.reject(err);
    }

    return Admin.findOne({
      _id: decode._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    }).select('_id email password');
  },


  changePassword(_id, currentPassword, newPassword) {
    console.log('db pass', _id);
    return Admin.findWithPassword({ _id }, currentPassword).then((adminData) => {
      const admin = adminData;
      if (!admin) {
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      }
      admin.password = newPassword;
      admin.save();
      console.log('user update');
      return Promise.resolve(admin);
    });
  },


  /**
   * Find user by criteria and validate password
   * @param criteria {Object} - query object like {_id:"USER_ID", email:"user@mail.com}
   * @param password {string} - current user's password
   * @returns Promise
   * */
  findWithPassword: (criteria, password) => new Promise((resolve, reject) => {
    Admin.findOne(criteria).select('_id password email')
      .then((admin) => {
        if (!admin) {
          const err = new APIError('User with provided credentials not found', 401, true);
          return reject(err);
        }
        return bcrypt.compare(password, admin.password).then((allow) => {
          if (!allow) {
            const err = new APIError('User with provided credentials not found', 401, true);
            return reject(err);
          }
          return resolve(admin);
        });
      })
      .catch(reject);
  }),

  /**
   * Generate password hash using bcrypt
   * @param password {string}
   * @returns Promise
   * */
  hash: (password, userPassowrd) => new Promise((resolve, reject) => {
    bcrypt.compare(password, userPassowrd, (err, res) => {
      if (res) {
        resolve(userPassowrd);
      } else {
        const hashError = new APIError('password not found', httpStatus.NOT_FOUND);
        reject(hashError);
      }
    });
  }),


  findByCredentials(email, password) {
    return Admin.findOne({ email }).then((admin) => {
      if (!admin) {
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND, true);
        return Promise.reject(err);
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, admin.password, (err, res) => {
          if (res) {
            resolve(admin);
          } else {
            const adminError = new APIError('password not found', httpStatus.NOT_FOUND, true);
            reject(adminError);
          }
        });
      });
    });
  }

};
/**
 * @typedef User
 */
Admin = mongoose.model('Admin', AdminSchema);
module.exports = { Admin };

// module.exports = mongoose.model('User', AdminSchema);
