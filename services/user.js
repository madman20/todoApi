const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const config = require('config')
const authHelper = require('../helpers/auth.js')

/**
 * To check user already exists with same email 
 * @param {string} - email
 * @return {object} - promise object
 */
exports.checkUserExists = (email) => new Promise((resolve, reject) => User.findOne({ email })
    .then(user => {
        let errObj = new Error('User does not exist');
        errObj.statusCode = 404
        if (!user) return reject(errObj);
        return resolve(user);
    }))

/**
 * To get user details
 * @param {string} - id
 * @return {object} - user model object
 */
exports.getUserById = id => User.findById(id).select('-password')


/**
 * To save new user 
 * @param {string} - name
 * @param {string} - email
 * @param {string} - password
 * @return {object} - user model object
 */
exports.saveUser = (name, email, password) => new Promise((resolve, reject) => {
    const newUser = new User({ name, email, password });
    return authHelper.genHashPassword(password)
        .then((pswd) => {
            newUser.password = pswd;
            return newUser.save().then(user => resolve(user));
        })
}) 